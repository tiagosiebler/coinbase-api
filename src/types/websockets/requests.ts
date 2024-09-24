/* eslint-disable @typescript-eslint/no-unused-vars */
export type WsOperation = 'subscribe' | 'unsubscribe';

/**
 * This is the format used for commands sent upstream for this websocket connection.
 *
 * Docs:
 * - Adv Trade: https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth#subscribing
 */
export interface WsRequestOperation<TWSTopic extends string = string> {
  type: WsOperation;
  channel: TWSTopic;
  product_ids?: string[];
  jwt?: string;
}

const heartBeats: WsRequestOperation = {
  type: 'subscribe',
  channel: 'heartbeats',
  jwt: 'XYZ',
};

const candles: WsRequestOperation = {
  type: 'subscribe',
  product_ids: ['ETH-USD'],
  channel: 'candles',
  jwt: 'XYZ',
};

const marketTrades: WsRequestOperation = {
  type: 'subscribe',
  product_ids: ['ETH-USD', 'BTC-USD'],
  channel: 'market_trades',
  jwt: 'XYZ',
};

const status: WsRequestOperation = {
  type: 'subscribe',
  product_ids: ['ETH-USD', 'BTC-USD'],
  channel: 'status',
  jwt: 'XYZ',
};

const ticker: WsRequestOperation = {
  type: 'subscribe',
  product_ids: ['ETH-USD', 'BTC-USD'],
  channel: 'ticker',
  jwt: 'XYZ',
};

const tickerBatch: WsRequestOperation = {
  type: 'subscribe',
  product_ids: ['ETH-USD', 'BTC-USD'],
  channel: 'ticker_batch',
  jwt: 'XYZ',
};

const level2: WsRequestOperation = {
  type: 'subscribe',
  product_ids: ['ETH-USD', 'BTC-USD'],
  channel: 'level2',
  jwt: 'XYZ',
};

const user: WsRequestOperation = {
  type: 'subscribe',
  channel: 'user',
  product_ids: ['BTC-USD'],
  jwt: 'XYZ',
};

const futuresBalSummary: WsRequestOperation = {
  type: 'subscribe',
  channel: 'futures_balance_summary',
  jwt: 'XYZ',
};
