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

export interface WsExchangeRequestOperation<TWSTopic extends string = string> {
  type: WsOperation;
  channels: (TWSTopic | WsExchangeChannelWithParams)[];
  product_ids?: string[];
}

/**
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
