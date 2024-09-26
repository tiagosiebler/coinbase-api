import { WS_KEY_MAP } from '../../lib/websocket/websocket-util.js';

export interface WsDataEvent<TData = any, TWSKey = string> {
  data: TData;
  table: string;
  wsKey: TWSKey;
}

/**
 * General event structure for events from the advanced trade websocket
 */
export interface CBAdvancedTradeEvent {
  channel: string;
  client_id: string;
  timestamp: string;
  sequence_num: number;
  events: Record<'subscriptions', Record<string, string[]>>;
}

export interface CBAdvancedTradeErrorEvent {
  type: 'error';
  message: string;
  wsKey:
    | typeof WS_KEY_MAP.advTradeMarketData
    | typeof WS_KEY_MAP.advTradeUserData;
}

/**
 * General event structure for events from the Coinbase Exchange websocket.
 * All Coinbase Exchange events extend this schema.
 */
export interface CBExchangeBaseEvent {
  type: 'subscriptions' | string;
  wsKey:
    | typeof WS_KEY_MAP.exchangeMarketData
    | typeof WS_KEY_MAP.exchangeDirectMarketData;
}

/**
 * Sent after subscribing to one or more channels
 */
export type CBExchangeSubscriptionsEvent = CBExchangeBaseEvent & {
  type: 'subscriptions';
  channels?: { name: string; product_ids: string[]; account_ids: null }[];
};
