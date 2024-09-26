import WebSocket from 'isomorphic-ws';

import { WsExchangeRequestOperation } from '../../types/websockets/requests.js';
import { signMessage } from '../webCryptoAPI.js';

/**
 * Each websocket URL (domain + endpoint) is represented as a "WS Key". Authentication is handled automatically if required.
 */
export const WS_KEY_MAP = {
  /**
   * Market Data is the traditional feed that provides updates for both orders and trades.
   * Most channels are now available without authentication. TODO: any here require auth?
   *
   * https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview
   */
  advTradeMarketData: 'advTradeMarketData', // no auth needed for public data
  /**
   * User Order Data provides updates for the orders of the user.
   *
   * https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview
   */
  advTradeUserData: 'advTradeUserData',
  /**
   * Coinbase Market Data (part of Coinbase Exchange API) is the traditional feed which is available without authentication.
   *
   * https://docs.cdp.coinbase.com/exchange/docs/websocket-overview
   */
  exchangeMarketData: 'exchangeMarketData',
  /**
   * Coinbase Direct Market Data has direct access to Coinbase Exchange servers and requires Authentication.
   *
   * https://docs.cdp.coinbase.com/exchange/docs/websocket-overview
   */
  exchangeDirectMarketData: 'exchangeDirectMarketData',
  /**
   * The INTX WebSocket feed is publicly available and provides real-time market data updates for orders and trades.
   * The SDK must authenticate when subscribing to the WebSocket Feed the very first time.
   *
   * https://docs.cdp.coinbase.com/intx/docs/websocket-overview
   */
  internationalMarketData: 'internationalMarketData',
  /**
   * The Prime WebSocket feed provides real-time market data updates for orders and trades. To begin
   * receiving feed messages, you must send a signed subscribe message to the server indicating
   * which channels and products to receive. The SDK will handle this automatically.
   *
   * https://docs.cdp.coinbase.com/prime/docs/websocket-feed
   */
  primeMarketData: 'primeMarketData',
} as const;

/** This is used to differentiate between each of the available websocket streams */
export type WsKey = (typeof WS_KEY_MAP)[keyof typeof WS_KEY_MAP];

/**
 * Normalised internal format for a request (subscribe/unsubscribe/etc) on a topic, with optional parameters.
 *
 * - Topic: the topic this event is for
 * - Payload: the parameters to include, optional. E.g. auth requires key + sign. Some topics allow configurable parameters.
 */
export interface WsTopicRequest<
  TWSTopic extends string = string,
  TWSPayload = any,
> {
  topic: TWSTopic;
  payload?: TWSPayload;
}

/**
 * Conveniently allow users to request a topic either as string topics or objects (containing string topic + params)
 */
export type WsTopicRequestOrStringTopic<
  TWSTopic extends string,
  TWSPayload = any,
> = WsTopicRequest<TWSTopic, TWSPayload> | string;

export interface MessageEventLike {
  target: WebSocket;
  type: 'message';
  data: string;
}

export function isMessageEvent(msg: unknown): msg is MessageEventLike {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  const message = msg as MessageEventLike;
  return message['type'] === 'message' && typeof message['data'] === 'string';
}

/**
 * Some exchanges have two livenet environments, some have test environments, some dont. This allows easy flexibility for different exchanges.
 * Examples:
 *  - One livenet and one testnet: NetworkMap<'livenet' | 'testnet'>
 *  - One livenet, sometimes two, one testnet: NetworkMap<'livenet' | 'testnet', 'livenet2'>
 *  - Only one livenet, no other networks: NetworkMap<'livenet'>
 */
type NetworkMap<
  TRequiredKeys extends string,
  TOptionalKeys extends string | undefined = undefined,
> = Record<TRequiredKeys, string> &
  (TOptionalKeys extends string
    ? Record<TOptionalKeys, string | undefined>
    : Record<TRequiredKeys, string>);

export const WS_URL_MAP: Record<WsKey, NetworkMap<'livenet' | 'testnet'>> = {
  [WS_KEY_MAP.advTradeMarketData]: {
    livenet: 'wss://advanced-trade-ws.coinbase.com',
    testnet: 'NotAvailable',
  },
  [WS_KEY_MAP.advTradeUserData]: {
    livenet: 'wss://advanced-trade-ws-user.coinbase.com',
    testnet: 'NotAvailable',
  },
  [WS_KEY_MAP.exchangeMarketData]: {
    livenet: 'wss://ws-feed.exchange.coinbase.com',
    testnet: 'wss://ws-feed-public.sandbox.exchange.coinbase.com',
  },
  [WS_KEY_MAP.exchangeDirectMarketData]: {
    livenet: 'wss://ws-direct.exchange.coinbase.com',
    testnet: 'wss://ws-direct.sandbox.exchange.coinbase.com',
  },
  [WS_KEY_MAP.internationalMarketData]: {
    livenet: 'wss://ws-md.international.coinbase.com',
    testnet: 'wss://ws-md.n5e2.coinbase.com',
  },
  [WS_KEY_MAP.primeMarketData]: {
    livenet: 'wss://ws-feed.prime.coinbase.com',
    testnet: 'NotAvailable',
  },
} as const;

export function getMergedCBExchangeWSRequestOperations<
  TWSTopic extends string = string,
>(operations: WsExchangeRequestOperation<TWSTopic>[]) {
  // The CB Exchange WS supports sending multiple topics in one request.
  // Merge all requests into one
  const mergedOperationEvents = operations.reduce(
    (
      acc: WsExchangeRequestOperation<TWSTopic>,
      evt: WsExchangeRequestOperation<TWSTopic>,
    ) => {
      if (!acc) {
        const wsRequestEvent: WsExchangeRequestOperation<TWSTopic> = {
          type: evt.type,
          channels: [...evt.channels],
        };

        return wsRequestEvent;
      }

      const wsRequestEvent: WsExchangeRequestOperation<TWSTopic> = {
        type: evt.type,
        channels: [...acc.channels, ...evt.channels],
      };

      return wsRequestEvent;
    },
  );

  return mergedOperationEvents;
}

export async function getCBExchangeWSSign(apiSecret: string): Promise<{
  timestampInSeconds: string;
  sign: string;
}> {
  const timestampInMs = Date.now();
  const timestampInSeconds = (timestampInMs / 1000).toFixed(0);

  const signPath = '/users/self/verify';
  const signRequestMethod = 'GET';
  const signInput = `${timestampInSeconds}${signRequestMethod}${signPath}`;

  const sign = await signMessage(
    signInput,
    apiSecret,
    'base64',
    'SHA-256',
    'base64:web',
  );

  return { sign, timestampInSeconds };
}
