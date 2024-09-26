/* eslint-disable @typescript-eslint/no-unused-vars */
export type WsOperation = 'subscribe' | 'unsubscribe';

/**
 * This is the format used for commands sent upstream for this websocket connection.
 *
 * Docs:
 * - Adv Trade: https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth#subscribing
 */
export interface WsAdvTradeRequestOperation<TWSTopic extends string = string> {
  type: WsOperation;
  channel: TWSTopic;
  product_ids?: string[];
  jwt?: string;
}

export interface WsExchangeChannelWithParams<TWSTopic extends string = string> {
  name: TWSTopic;
  product_ids: string[];
}

/**
 * Public subscribe/unsubscribe requests for the Coinbase Exchange product group
 */
export interface WsExchangeRequestOperation<TWSTopic extends string = string> {
  type: WsOperation;
  channels: (TWSTopic | WsExchangeChannelWithParams)[];
  product_ids?: string[];
}

/**
 * Private (authenticated) subscribe/unsubscribe requests for the Coinbase Exchange product group
 * https://docs.cdp.coinbase.com/exchange/docs/websocket-auth
 */
export type WsExchangeAuthenticatedRequestOperation<
  TWSTopic extends string = string,
> = WsExchangeRequestOperation<TWSTopic> & {
  signature: string;
  key: string;
  passphrase: string;
  timestamp: string;
};

/**
 * Public subscribe/unsubscribe requests for the Coinbase International product group
 */
export interface WsInternationalRequestOperation<
  TWSTopic extends string = string,
> {
  type: Uppercase<WsOperation>;
  channels: TWSTopic[];
  product_ids?: string[];
}

/**
 * Private (authenticated) subscribe/unsubscribe requests for the Coinbase International product group
 * https://docs.cdp.coinbase.com/intx/docs/websocket-auth
 */
export type WsInternationalAuthenticatedRequestOperation<
  TWSTopic extends string = string,
> = WsInternationalRequestOperation<TWSTopic> & {
  time: string;
  key: string;
  passphrase: string;
  signature: string;
};

/**
 * Public subscribe/unsubscribe requests for the Coinbase Prime product group
 */
export interface WsPrimeRequestOperation<TWSTopic extends string = string> {
  type: WsOperation;
  channel: TWSTopic;
  // these should be provided as a payload with the request, else auth will fail
  svcAccountId: string;
  portfolio_id: string;
  product_ids: string[];
}

/**
 * Private (authenticated) subscribe/unsubscribe requests for the Coinbase Prime product group
 *
 * - https://docs.cdp.coinbase.com/prime/docs/websocket-feed#signing-messages
 * - https://docs.cdp.coinbase.com/prime/docs/websocket-channels
 */
export type WsPrimeAuthenticatedRequestOperation<
  TWSTopic extends string = string,
> = WsPrimeRequestOperation<TWSTopic> & {
  access_key: string;
  api_key_id: string;
  passphrase: string;
  signature: string;
  timestamp: string;
};
