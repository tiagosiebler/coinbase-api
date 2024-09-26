/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CBAdvancedTradeErrorEvent,
  CBAdvancedTradeEvent,
  CBExchangeBaseEvent,
} from '../../types/websockets/events.js';
import { WsExchangeRequestOperation } from '../../types/websockets/requests.js';
import { WS_KEY_MAP, WsKey } from './websocket-util.js';

function isDefinedObject(value: unknown): value is object {
  return typeof value === 'object' || !value;
}

export function isCBAdvancedTradeWSEvent(
  event: unknown,
): event is CBAdvancedTradeEvent {
  if (!isDefinedObject(event)) {
    return false;
  }

  const message = event as CBAdvancedTradeEvent;
  return typeof message.channel === 'string';
}

/**
 * Type guard that checks whether this event is/extends CBExchangeBaseEvent,
 * used for incoming events from ther server
 */
export function isCBExchangeWSEvent(
  event: unknown,
  wsKey: WsKey,
): event is CBExchangeBaseEvent {
  if (!isDefinedObject(event)) {
    return false;
  }

  return (
    wsKey === WS_KEY_MAP.exchangeMarketData ||
    wsKey === WS_KEY_MAP.exchangeDirectMarketData
  );
}

// {"type":"error","message":"rate limit exceeded","wsKey":"advTradeMarketData"}
export function isCBAdvancedTradeErrorEvent(
  event: unknown,
): event is CBAdvancedTradeErrorEvent {
  if (!isDefinedObject(event)) {
    return false;
  }

  const message = event as CBAdvancedTradeErrorEvent;
  return message.type === 'error';
}

/**
 * Silly type guard for the structure of events being sent to the server
 * (e.g. when subscribing to a topic)
 */
export function isCBExchangeWSRequestOperation<
  TWSTopic extends string = string,
>(evt: unknown, wsKey: WsKey): evt is WsExchangeRequestOperation<TWSTopic> {
  if (!isDefinedObject(evt)) {
    return false;
  }

  const looseTypedEvt = evt as WsExchangeRequestOperation<TWSTopic>;

  if (
    typeof looseTypedEvt.type !== 'string' ||
    !Array.isArray(looseTypedEvt.channels)
  ) {
    return false;
  }

  return (
    wsKey === WS_KEY_MAP.exchangeDirectMarketData ||
    wsKey === WS_KEY_MAP.exchangeMarketData
  );
}
