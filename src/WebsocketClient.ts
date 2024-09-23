/* eslint-disable @typescript-eslint/no-unused-vars */
import { CBAdvancedTradeClient } from './CBAdvancedTradeClient.js';
import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { signWSJWT } from './lib/jwtNode.js';
import { neverGuard } from './lib/misc-util.js';
import { isCBWSEvent } from './lib/websocket/typeGuards.js';
import {
  MessageEventLike,
  WS_KEY_MAP,
  WS_URL_MAP,
  WsKey,
  WsTopicRequest,
} from './lib/websocket/websocket-util.js';
import { WSConnectedResult } from './lib/websocket/WsStore.types.js';
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

export const WS_LOGGER_CATEGORY = { category: 'coinbase-ws' };

/**
 * Any WS keys in this list will trigger automatic auth as required, if credentials are available
 */
const PRIVATE_WS_KEYS: WsKey[] = [
  // Account data (fills), requires auth.
  WS_KEY_MAP.advTradeUserData,
  // Coinbase Direct Market Data has direct access to Coinbase Exchange servers and requires auth.
  WS_KEY_MAP.exchangeDirectMarketData,
  // The INTX feed requires auth.
  WS_KEY_MAP.internationalMarketData,
  // The prime feed requires auth.
  WS_KEY_MAP.primeMarketData,
];

/**
 * Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available
 */
export const PUBLIC_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.advTradeMarketData,
  WS_KEY_MAP.exchangeMarketData,
];

/**
 * WS topics are always a string for this exchange. Some exchanges use complex objects.
 */
type WsTopic = string;

export class WebsocketClient extends BaseWebsocketClient<WsKey> {
  // private RESTClientCache: Record<WsMarket, CBAdvancedTradeClient | undefined> =
  //   {
  //     advancedTrade: undefined,
  //     exchange: undefined,
  //     international: undefined,
  //     prime: undefined,
  //   };

  // private getRESTClient(wsKey: WsKey): undefined {
  //   switch (wsKey) {
  //     case WS_KEY_MAP.advTradeMarketData:
  //     case WS_KEY_MAP.advTradeUserData:
  //     case WS_KEY_MAP.exchangeMarketData:
  //     case WS_KEY_MAP.exchangeDirectMarketData:
  //     case WS_KEY_MAP.internationalMarketData:
  //     case WS_KEY_MAP.primeMarketData: {
  //       break;
  //     }
  //     default: {
  //       throw neverGuard(wsKey, `Unhandled WsKey: "${wsKey}"`);
  //     }
  //   }
  //   // if (wsKey === 'spotPublicV1' || wsKey === 'spotPrivateV1') {
  //   //   const clientType = 'advancedTrade';
  //   //   if (this.RESTClientCache[clientType]) {
  //   //     return this.RESTClientCache[clientType];
  //   //   }

  //   //   this.RESTClientCache[clientType] = new CBAdvancedTradeClient({
  //   //     apiKey: this.options.apiKey,
  //   //     apiSecret: this.options.apiSecret,
  //   //   });
  //   //   return this.RESTClientCache[clientType];
  //   // }

  //   // const clientType = 'advancedTrade';
  //   // if (this.RESTClientCache[clientType]) {
  //   //   return this.RESTClientCache[clientType];
  //   // }

  //   // this.RESTClientCache[clientType] = new CBAdvancedTradeClient({
  //   //   apiKey: this.options.apiKey,
  //   //   apiSecret: this.options.apiSecret,
  //   // });
  //   // return this.RESTClientCache[clientType];

  //   // throw neverGuard(wsKey, `Unhandled WsKey: "${wsKey}"`);
  // }

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<(WSConnectedResult | undefined)[]> {
    return Promise.all([
      this.connect(WS_KEY_MAP.advTradeMarketData),
      this.connect(WS_KEY_MAP.advTradeUserData),
      this.connect(WS_KEY_MAP.exchangeMarketData),
      this.connect(WS_KEY_MAP.exchangeDirectMarketData),
      this.connect(WS_KEY_MAP.internationalMarketData),
      this.connect(WS_KEY_MAP.primeMarketData),
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

    const useSandbox = this.options.useSandbox;
    const networkKey = useSandbox ? 'testnet' : 'livenet';

    const baseUrl = WS_URL_MAP[wsKey][networkKey];

    return baseUrl;
  }

  protected sendPingEvent(wsKey: WsKey) {
    const wsState = this.getWsStore().get(wsKey);
    const ws = wsState?.ws;
    ws?.ping();
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

      const responseEvents = ['subscriptions'];
      // const connectionReadyEvents = [''];

      // TODO: this is the format for advanced trade WS, what about other product groups?
      if (isCBWSEvent(parsed)) {
        const eventType = parsed.channel;

        // These are request/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (responseEvents.includes(eventType)) {
          return [
            {
              eventType: 'response',
              event: parsed,
            },
          ];
        }

        // Generic data for a channel
        if (typeof eventType === 'string') {
          return [
            {
              eventType: 'update',
              event: parsed,
            },
          ];
        }
      }

      this.logger.error(
        `!! (${wsKey}) Unhandled non-string event type... Defaulting to "update" channel...` +
          JSON.stringify(parsed),
      );

      return [
        {
          eventType: 'update',
          event: parsed,
        },
      ];
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
    switch (market) {
      case 'advancedTrade': {
        return isPrivate
          ? WS_KEY_MAP.advTradeUserData
          : WS_KEY_MAP.advTradeMarketData;
      }
      case 'exchange': {
        return isPrivate
          ? WS_KEY_MAP.exchangeDirectMarketData
          : WS_KEY_MAP.exchangeMarketData;
      }
      case 'international': {
        return isPrivate
          ? WS_KEY_MAP.internationalMarketData
          : WS_KEY_MAP.internationalMarketData;
      }
      case 'prime': {
        return isPrivate
          ? WS_KEY_MAP.primeMarketData
          : WS_KEY_MAP.primeMarketData;
      }
      default: {
        throw neverGuard(market, `Unhandled "market": "${market}"`);
      }
    }
  }

  protected getWsMarketForWsKey(wsKey: WsKey): WsMarket {
    switch (wsKey) {
      case WS_KEY_MAP.advTradeMarketData:
      case WS_KEY_MAP.advTradeUserData: {
        return 'advancedTrade';
      }
      case WS_KEY_MAP.exchangeMarketData:
      case WS_KEY_MAP.exchangeDirectMarketData: {
        return 'exchange';
      }
      case WS_KEY_MAP.internationalMarketData: {
        return 'international';
      }
      case WS_KEY_MAP.primeMarketData: {
        return 'prime';
      }
      default: {
        throw neverGuard(wsKey, `Unhandled WsKey: "${wsKey}"`);
      }
    }
  }

  protected getPrivateWSKeys(): WsKey[] {
    return PRIVATE_WS_KEYS;
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    switch (wsKey) {
      default: {
        return null;
        // throw neverGuard(
        //   wsKey,
        //   `getMaxTopicsPerSubscribeEvent(): Unhandled wsKey`,
        // );
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

      // Good place to build event format depending on product group, if format varies (similar to auth being different)
      const wsRequestEvent: WsRequestOperation<WsTopic> = {
        type: operation,
        channel: topicRequest.topic,
        ...topicRequest.payload,
      };

      if (isPrivateWsTopic) {
        if (wsKey === 'advTradeUserData') {
          const apiKey = this.options.apiKey;
          const apiSecret = this.options.apiSecret;
          if (!apiKey || !apiSecret) {
            throw new Error(
              `"options.apiKey" (api key name) and/or "options.apiSecret" missing, unable to generate JWT`,
            );
          }
          const jwtExpiresSeconds = this.options.jwtExpiresSeconds || 120;
          const timestamp = Date.now();

          const sign = signWSJWT({
            algorithm: 'ES256',
            timestampMs: timestamp,
            jwtExpiresSeconds,
            apiPubKey: apiKey,
            apiPrivKey: apiSecret,
          });

          return {
            ...wsRequestEvent,
            jwt: sign,
          };
        }

        throw new Error(`Auth not implemented yet for wsKey "${wsKey}"`);
        // const apiPassphrase = this.options.apiPassphrase;
      }

      return wsRequestEvent;
    });

    // Events that are ready to send (usually stringified JSON)
    return operationEvents.map((event) => JSON.stringify(event));
  }

  protected async getWsAuthRequestEvent(wsKey: WsKey): Promise<object> {
    return { wsKey };
  }
}
