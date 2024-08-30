import { AdvancedTradeClient } from './AdvancedTradeClient.js';
import { FuturesClient } from './FuturesClient.js';
import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { neverGuard } from './lib/misc-util.js';
import {
  MessageEventLike,
  WS_KEY_MAP,
  WsKey,
  WsTopicRequest,
} from './lib/websocket/websocket-util.js';
import { WSConnectedResult } from './lib/websocket/WsStore.types.js';
import { APISuccessResponse } from './types/response/shared.types.js';
import { WsConnectionInfo } from './types/response/ws.js';
import { WsMarket } from './types/websockets/client.js';
import {
  WsOperation,
  WsRequestOperation,
} from './types/websockets/requests.js';
import {
  WsAPITopicRequestParamMap,
  WsAPITopicResponseMap,
  WsAPIWsKeyTopicMap,
} from './types/websockets/wsAPI.js';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const WS_LOGGER_CATEGORY = { category: 'coinbase-ws' };

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
const PRIVATE_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.spotPrivateV1,
  WS_KEY_MAP.futuresPrivateV1,
];

/** Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available */
export const PUBLIC_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.spotPublicV1,
  WS_KEY_MAP.futuresPublicV1,
];

/**
 * WS topics are always a string for this exchange. Some exchanges use complex objects.
 */
type WsTopic = string;

export class WebsocketClient extends BaseWebsocketClient<WsKey> {
  private RESTClientCache: Record<
    WsMarket,
    AdvancedTradeClient | FuturesClient | undefined
  > = {
    spot: undefined,
    futures: undefined,
  };

  private getRESTClient(wsKey: WsKey): AdvancedTradeClient | FuturesClient {
    if (wsKey === 'spotPublicV1' || wsKey === 'spotPrivateV1') {
      const clientType = 'spot';
      if (this.RESTClientCache[clientType]) {
        return this.RESTClientCache[clientType];
      }

      this.RESTClientCache[clientType] = new AdvancedTradeClient({
        apiKey: this.options.apiKey,
        apiSecret: this.options.apiSecret,
        apiPassphrase: this.options.apiPassphrase,
      });
      return this.RESTClientCache[clientType];
    }

    if (wsKey === 'futuresPublicV1' || wsKey === 'futuresPrivateV1') {
      const clientType = 'futures';
      if (this.RESTClientCache[clientType]) {
        return this.RESTClientCache[clientType];
      }

      this.RESTClientCache[clientType] = new FuturesClient({
        apiKey: this.options.apiKey,
        apiSecret: this.options.apiSecret,
        apiPassphrase: this.options.apiPassphrase,
      });
      return this.RESTClientCache[clientType];
    }

    throw new Error(`Unhandled WsKey: "${wsKey}"`);
  }

  private async getWSConnectionInfo(
    wsKey: WsKey,
  ): Promise<APISuccessResponse<WsConnectionInfo>> {
    const restClient = this.getRESTClient(wsKey);

    if (wsKey === 'spotPrivateV1' || wsKey === 'futuresPrivateV1') {
      return restClient.getPrivateWSConnectionToken();
    }

    return restClient.getPublicWSConnectionToken();
  }

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<(WSConnectedResult | undefined)[]> {
    return Promise.all([
      this.connect(WS_KEY_MAP.spotPublicV1),
      this.connect(WS_KEY_MAP.spotPrivateV1),
      this.connect(WS_KEY_MAP.futuresPublicV1),
      this.connect(WS_KEY_MAP.futuresPrivateV1),
    ]);
  }

  /**
   * Request subscription to one or more topics. Pass topics as either an array of strings, or array of objects (if the topic has parameters).
   * Objects should be formatted as {topic: string, params: object}.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.subscribeTopicsForWsKey([requests], wsKey);
      return;
    }

    if (requests.length) {
      this.subscribeTopicsForWsKey(requests, wsKey);
    }
  }

  /**
   * Unsubscribe from one or more topics. Similar to subscribe() but in reverse.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.unsubscribeTopicsForWsKey([requests], wsKey);
      return;
    }

    if (requests.length) {
      this.unsubscribeTopicsForWsKey(requests, wsKey);
    }
  }

  /**
   * Not supported by this exchange, do not use
   */

  // This overload allows the caller to omit the 3rd param, if it isn't required (e.g. for the login call)
  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSChannel extends WsAPIWsKeyTopicMap[TWSKey] = WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends
      WsAPITopicRequestParamMap[TWSChannel] = WsAPITopicRequestParamMap[TWSChannel],
    TWSAPIResponse extends
      | WsAPITopicResponseMap[TWSChannel]
      | object = WsAPITopicResponseMap[TWSChannel],
  >(
    wsKey: TWSKey,
    channel: TWSChannel,
    ...params: TWSParams extends undefined ? [] : [TWSParams]
  ): Promise<TWSAPIResponse>;

  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap = keyof WsAPIWsKeyTopicMap,
    TWSChannel extends WsAPIWsKeyTopicMap[TWSKey] = WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends
      WsAPITopicRequestParamMap[TWSChannel] = WsAPITopicRequestParamMap[TWSChannel],
  >(
    wsKey: TWSKey,
    channel: TWSChannel,
    params?: TWSParams,
  ): Promise<undefined> {
    this.logger.trace(`sendWSAPIRequest(): assert "${wsKey}" is connected`, {
      channel,
      params,
    });

    return;
  }

  /**
   *
   * Internal methods
   *
   */

  /**
   * Whatever url this method returns, it's connected to as-is!
   *
   * If a token or anything else is needed in the URL, this is a good place to add it.
   */
  protected async getWsUrl(wsKey: WsKey): Promise<string> {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const connectionInfo = await this.getWSConnectionInfo(wsKey);
    this.logger.trace(`getWSConnectionInfo`, {
      wsKey,
      ...connectionInfo,
    });

    const server = connectionInfo.data.instanceServers[0];
    if (!server) {
      this.logger.error(
        `No servers returned by connection info response?`,
        JSON.stringify(
          {
            wsKey,
            connectionInfo,
          },
          null,
          2,
        ),
      );
      throw new Error(`No servers returned by connection info response?`);
    }

    const connectionUrl = `${server.endpoint}?token=${connectionInfo.data.token}`;
    return connectionUrl;
  }

  protected sendPingEvent(wsKey: WsKey) {
    return this.tryWsSend(wsKey, `{ "id": "${Date.now()}", "type": "ping" }`);
  }

  protected sendPongEvent(wsKey: WsKey) {
    try {
      this.logger.trace(`Sending upstream ws PONG: `, {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
      });
      if (!wsKey) {
        throw new Error('Cannot send PONG, no wsKey provided');
      }

      const wsState = this.getWsStore().get(wsKey);
      if (!wsState || !wsState?.ws) {
        throw new Error(`Cannot send pong, ${wsKey} socket not connected yet`);
      }

      // Send a protocol layer pong
      wsState.ws.pong();
    } catch (e) {
      this.logger.error(`Failed to send WS PONG`, {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
        exception: e,
      });
    }
  }

  protected isWsPing(msg: any): boolean {
    if (msg?.data === 'ping') {
      return true;
    }
    return false;
  }

  protected isWsPong(msg: any): boolean {
    if (msg?.data?.includes('pong')) {
      return true;
    }

    // this.logger.info(`Not a pong: `, msg);
    return false;
  }

  protected resolveEmittableEvents(
    wsKey: WsKey,
    event: MessageEventLike,
  ): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const parsed = JSON.parse(event.data);

      const responseEvents = ['subscribe', 'unsubscribe', 'ack'];
      const authenticatedEvents = ['login', 'access'];
      const connectionReadyEvents = ['welcome'];

      const eventType = parsed.event || parsed.type;
      if (typeof eventType === 'string') {
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        if (connectionReadyEvents.includes(eventType)) {
          return [
            {
              eventType: 'connectionReady',
              event: parsed,
            },
          ];
        }

        // These are request/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (responseEvents.includes(eventType)) {
          results.push({
            eventType: 'response',
            event: parsed,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (authenticatedEvents.includes(eventType)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
          });
          return results;
        }

        if (eventType === 'message') {
          return [{ eventType: 'update', event: parsed }];
        }

        this.logger.error(
          `!! (${wsKey}) Unhandled string event type "${eventType}". Defaulting to "update" channel...`,
          parsed,
        );

        results.push({
          eventType: 'update',
          event: parsed,
        });

        return results;
      }

      this.logger.error(
        `!! (${wsKey}) Unhandled non-string event type "${eventType}". Defaulting to "update" channel...`,
        parsed,
      );

      results.push({
        eventType: 'update',
        event: parsed,
      });
    } catch (e) {
      results.push({
        event: {
          message: 'Failed to parse event data due to exception',
          exception: e,
          eventData: event.data,
        },
        eventType: 'exception',
      });

      this.logger.error(`Failed to parse event data due to exception: `, {
        exception: e,
        eventData: event.data,
      });
    }

    return results;
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateTopicRequest(
    request: WsTopicRequest<string>,
    wsKey: WsKey,
  ): boolean {
    return request && PRIVATE_WS_KEYS.includes(wsKey);
  }

  protected getWsKeyForMarket(market: WsMarket, isPrivate: boolean): WsKey {
    return isPrivate
      ? market === 'spot'
        ? WS_KEY_MAP.spotPrivateV1
        : WS_KEY_MAP.futuresPrivateV1
      : market === 'spot'
        ? WS_KEY_MAP.spotPublicV1
        : WS_KEY_MAP.futuresPublicV1;
  }

  protected getWsMarketForWsKey(key: WsKey): WsMarket {
    switch (key) {
      case 'futuresPrivateV1':
      case 'futuresPublicV1': {
        return 'futures';
      }
      case 'spotPrivateV1':
      case 'spotPublicV1': {
        return 'spot';
      }
      default: {
        throw neverGuard(key, `Unhandled ws key "${key}"`);
      }
    }
  }

  protected getPrivateWSKeys(): WsKey[] {
    return PRIVATE_WS_KEYS;
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    switch (wsKey) {
      case 'futuresPrivateV1':
      case 'futuresPublicV1':
      case 'spotPrivateV1':
      case 'spotPublicV1': {
        // Return a number if there's a limit on the number of sub topics per rq
        // Always 1 at a time for this exchange
        return 1;
      }
      default: {
        throw neverGuard(
          wsKey,
          `getMaxTopicsPerSubscribeEvent(): Unhandled wsKey`,
        );
      }
    }
  }

  /**
   * Map one or more topics into fully prepared "subscribe request" events (already stringified and ready to send)
   */
  protected async getWsOperationEventsForTopics(
    topicRequests: WsTopicRequest<string>[],
    wsKey: WsKey,
    operation: WsOperation,
  ): Promise<string[]> {
    if (!topicRequests.length) {
      return [];
    }

    // Operations structured in a way that this exchange understands
    const operationEvents = topicRequests.map((topicRequest) => {
      const isPrivateWsTopic = this.isPrivateTopicRequest(topicRequest, wsKey);

      const wsRequestEvent: WsRequestOperation<WsTopic> = {
        id: getRandomInt(999999999999),
        type: operation,
        topic: topicRequest.topic,
        privateChannel: isPrivateWsTopic,
        response: true,
        ...topicRequest.payload,
      };

      return wsRequestEvent;
    });

    // Events that are ready to send (usually stringified JSON)
    return operationEvents.map((event) => JSON.stringify(event));
  }

  protected async getWsAuthRequestEvent(wsKey: WsKey): Promise<object> {
    return { wsKey };
  }
}
