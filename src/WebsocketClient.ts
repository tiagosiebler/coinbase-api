import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { signWSJWT } from './lib/jwtNode.js';
import { neverGuard } from './lib/misc-util.js';
import {
  isCBAdvancedTradeErrorEvent,
  isCBAdvancedTradeWSEvent,
  isCBExchangeWSEvent,
  isCBExchangeWSRequestOperation,
  isCBINTXWSRequestOperation,
  isCBPrimeWSRequestOperation,
} from './lib/websocket/typeGuards.js';
import {
  getCBExchangeWSSign,
  getCBInternationalWSSign,
  getCBPrimeWSSign,
  getMergedCBExchangeWSRequestOperations,
  MessageEventLike,
  WS_KEY_MAP,
  WS_URL_MAP,
  WsKey,
  WsTopicRequest,
} from './lib/websocket/websocket-util.js';
import { WSConnectedResult } from './lib/websocket/WsStore.types.js';
import { WsMarket } from './types/websockets/client.js';
import {
  WsAdvTradeRequestOperation,
  WsExchangeAuthenticatedRequestOperation,
  WsExchangeRequestOperation,
  WsInternationalAuthenticatedRequestOperation,
  WsInternationalRequestOperation,
  WsOperation,
  WsPrimeAuthenticatedRequestOperation,
  WsPrimeRequestOperation,
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
  // The INTX feed always requires auth.
  WS_KEY_MAP.internationalMarketData,
  // The Prime feed always requires auth.
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
   * Return a websocket URL, which is connected to as-is.
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

      // E.g. {"type":"error","message":"rate limit exceeded","wsKey":"advTradeMarketData"}
      if (isCBAdvancedTradeErrorEvent(parsed)) {
        return [{ eventType: 'exception', event: parsed }];
      }

      // Parse Advanced Trade WS events (update & response)
      if (isCBAdvancedTradeWSEvent(parsed)) {
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

      // Parse CB Exchange WS events
      if (isCBExchangeWSEvent(parsed, wsKey)) {
        const eventType = parsed.type;

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
      case WS_KEY_MAP.advTradeMarketData:
      case WS_KEY_MAP.advTradeUserData:
      // Technically, INTX supports request batching but not with nested parameters, so we'll send one at a time
      case WS_KEY_MAP.internationalMarketData:
        return 1;
      // Exchange supports request batching, no known limit to max topics per request
      case WS_KEY_MAP.exchangeDirectMarketData:
      case WS_KEY_MAP.exchangeMarketData: {
        return null;
      }
      default: {
        return null;
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

    const apiKey = this.options.apiKey;
    const apiSecret = this.options.apiSecret;
    const apiPassphrase = this.options.apiPassphrase;

    /**
     * Operations need to be structured in a way that this exchange understands.
     * Parse the internal format into the format expected by the exchange. One request per operation.
     */
    const operationEvents = topicRequests.map((topicRequest) => {
      switch (wsKey) {
        case WS_KEY_MAP.advTradeMarketData:
        case WS_KEY_MAP.advTradeUserData: {
          const wsRequestEvent: WsAdvTradeRequestOperation<WsTopic> = {
            type: operation,
            channel: topicRequest.topic,
            ...topicRequest.payload,
          };

          return wsRequestEvent;
        }
        case WS_KEY_MAP.exchangeMarketData:
        case WS_KEY_MAP.exchangeDirectMarketData: {
          const wsRequestEvent: WsExchangeRequestOperation<WsTopic> = {
            type: operation,
            channels: [
              topicRequest.payload
                ? {
                    name: topicRequest.topic,
                    ...topicRequest.payload,
                  }
                : topicRequest.topic,
            ],
          };

          return wsRequestEvent;
        }
        case WS_KEY_MAP.internationalMarketData: {
          // In case there's ever more operation types than "subscribe" and "unsubscribe"
          if (!['subscribe', 'unsubscribe'].includes(operation)) {
            throw new Error(
              `Unhandled request operation type for CB International WS: "${operation}"`,
            );
          }

          const wsRequestEvent: WsInternationalRequestOperation<WsTopic> = {
            type: operation === 'subscribe' ? 'SUBSCRIBE' : 'UNSUBSCRIBE',
            // As of Sep 2024, parameters (such as product_id[]) cannot be nested with the channels array
            channels: [topicRequest.topic],
            // This merges parametrs (such as product_id[]) into the top level request object
            ...topicRequest.payload,
          };

          return wsRequestEvent;
        }
        case WS_KEY_MAP.primeMarketData: {
          const wsRequestEvent: WsPrimeRequestOperation<WsTopic> = {
            type: operation,
            channel: topicRequest.topic,
            ...topicRequest.payload,
          };

          return wsRequestEvent;
        }
        default: {
          throw new Error(
            `Not implemented for "${wsKey}" yet - if you need Prime or INTX, please get in touch.`,
          );
        }
      }
    });

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    const isPrivateChannel = PRIVATE_WS_KEYS.includes(wsKey);

    /**
     * - Merge commands into one if the exchange supports batch requests,
     * - Apply auth/sign, if needed,
     * - Apply any final formatting to return a string array, ready to be sent upstream.
     */
    switch (wsKey) {
      case WS_KEY_MAP.advTradeMarketData:
      case WS_KEY_MAP.advTradeUserData: {
        // Events that are ready to send (usually stringified JSON)
        // ADV trade only supports sending one at a time, so we don't try to merge them
        // These are already signed, if needed.
        return operationEvents.map((evt) => {
          if (!isPrivateChannel) {
            return JSON.stringify(evt);
          }

          if (!apiKey || !apiSecret) {
            throw new Error(
              `"options.apiKey" (api key name) and/or "options.apiSecret" missing, unable to generate JWT`,
            );
          }
          const jwtExpiresSeconds = this.options.jwtExpiresSeconds || 120;
          const timestamp = Date.now();

          /**
           * No batching is supported for this product group, so we can already
           * handle sign here and return it as is
           */
          const sign = signWSJWT({
            algorithm: 'ES256',
            timestampMs: timestamp,
            jwtExpiresSeconds,
            apiPubKey: apiKey,
            apiPrivKey: apiSecret,
          });

          const operationEventWithSign = {
            ...evt,
            jwt: sign,
          };

          return JSON.stringify(operationEventWithSign);
        });
      }
      case WS_KEY_MAP.exchangeMarketData:
      case WS_KEY_MAP.exchangeDirectMarketData: {
        if (
          !operationEvents.every((evt) =>
            isCBExchangeWSRequestOperation(evt, wsKey),
          )
        ) {
          // Don't expect this to ever happen, but just to please typescript...
          throw new Error(
            `Unexpected request schema for exchange WS request builder`,
          );
        }

        const mergedOperationEvents =
          getMergedCBExchangeWSRequestOperations(operationEvents);

        // We're under the max topics per request limit.
        // Send operation requests as one merged request
        if (
          !maxTopicsPerEvent ||
          mergedOperationEvents.channels.length <= maxTopicsPerEvent
        ) {
          if (!isPrivateChannel) {
            return [JSON.stringify(mergedOperationEvents)];
          }

          if (!apiKey || !apiSecret || !apiPassphrase) {
            throw new Error(
              `One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.`,
            );
          }

          const { sign, timestampInSeconds } =
            await getCBExchangeWSSign(apiSecret);

          const mergedOperationEventsWithSign: WsExchangeAuthenticatedRequestOperation<WsTopic> =
            {
              ...mergedOperationEvents,
              signature: sign,
              key: apiKey,
              passphrase: apiPassphrase,
              timestamp: timestampInSeconds,
            };

          return [JSON.stringify(mergedOperationEventsWithSign)];
        }

        // We're over the max topics per request limit. Break into batches.
        const finalOperations: string[] = [];
        for (
          let i = 0;
          i < mergedOperationEvents.channels.length;
          i += maxTopicsPerEvent
        ) {
          const batchChannels = mergedOperationEvents.channels.slice(
            i,
            i + maxTopicsPerEvent,
          );

          const wsRequestEvent: WsExchangeRequestOperation<WsTopic> = {
            type: mergedOperationEvents.type,
            channels: [...batchChannels],
          };

          if (isPrivateChannel) {
            if (!apiKey || !apiSecret || !apiPassphrase) {
              throw new Error(
                `One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.`,
              );
            }

            const { sign, timestampInSeconds } =
              await getCBExchangeWSSign(apiSecret);

            const wsRequestEventWithSign: WsExchangeAuthenticatedRequestOperation<WsTopic> =
              {
                ...wsRequestEvent,
                signature: sign,
                key: apiKey,
                passphrase: apiPassphrase,
                timestamp: timestampInSeconds,
              };
            finalOperations.push(JSON.stringify(wsRequestEventWithSign));
          } else {
            finalOperations.push(JSON.stringify(wsRequestEvent));
          }
        }

        return finalOperations;
      }
      case WS_KEY_MAP.internationalMarketData: {
        if (
          !operationEvents.every((evt) =>
            isCBINTXWSRequestOperation(evt, wsKey),
          )
        ) {
          // Don't expect this to ever happen, but just to please typescript...
          throw new Error(
            `Unexpected request schema for exchange WS request builder`,
          );
        }

        // We're over the max topics per request limit. Break into batches.
        const finalOperations: string[] = [];
        for (const operationEvent of operationEvents) {
          if (!apiKey || !apiSecret || !apiPassphrase) {
            throw new Error(
              `One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.`,
            );
          }

          const { sign, timestampInSeconds } = await getCBInternationalWSSign(
            apiKey,
            apiSecret,
            apiPassphrase,
          );

          const wsRequestEventWithSign: WsInternationalAuthenticatedRequestOperation<WsTopic> =
            {
              ...operationEvent,
              time: timestampInSeconds,
              key: apiKey,
              passphrase: apiPassphrase,
              signature: sign,
            };

          finalOperations.push(JSON.stringify(wsRequestEventWithSign));
        }

        // throw new Error(
        //   'CB INTX is not fully implemented yet - awaiting test environment... if you need this, please get in touch.',
        // );
        return finalOperations;
      }
      case WS_KEY_MAP.primeMarketData: {
        if (
          !operationEvents.every((evt) =>
            isCBPrimeWSRequestOperation(evt, wsKey),
          )
        ) {
          // Don't expect this to ever happen, but just to please typescript...
          throw new Error(
            `Unexpected request schema for exchange WS request builder`,
          );
        }
        if (!apiKey || !apiSecret || !apiPassphrase) {
          throw new Error(
            `One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.`,
          );
        }

        const finalOperations: string[] = [];
        for (const operationEvent of operationEvents) {
          const { sign, timestampInSeconds } = await getCBPrimeWSSign({
            channelName: operationEvent.channel,
            svcAccountId: operationEvent.svcAccountId,
            portfolioId: operationEvent.portfolio_id,
            apiKey,
            apiSecret,
            product_ids: operationEvent.product_ids,
          });

          const wsRequestEventWithSign: WsPrimeAuthenticatedRequestOperation<WsTopic> =
            {
              ...operationEvent,
              api_key_id: apiKey,
              access_key: apiSecret,
              passphrase: apiPassphrase,
              signature: sign,
              timestamp: timestampInSeconds,
            };

          finalOperations.push(JSON.stringify(wsRequestEventWithSign));
        }

        // throw new Error(
        //   'CB Prime is not fully implemented yet - awaiting test environment... if you need this, please get in touch.',
        // );
        return finalOperations;
      }
      default: {
        throw neverGuard(wsKey, `Not implemented for "${wsKey}" yet`);
        // throw new Error(`Not implemented for "${wsKey}" yet`);
      }
    }
  }

  /**
   * Events are signed per-request, so this function isn't needed for Coinbase.
   */
  protected async getWsAuthRequestEvent(wsKey: WsKey): Promise<object> {
    return { wsKey };
  }
}
