/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CBAdvancedTradeErrorEvent,
  CBAdvancedTradeEvent,
  CBExchangeBaseEvent,
} from '../../types/websockets/events.js';
import {
  WsExchangeRequestOperation,
  WsInternationalRequestOperation,
  WsPrimeRequestOperation,
} from '../../types/websockets/requests.js';
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
 * Type guard that checks whether this event is/extends CBExchangeBaseEvent
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

/**
 * Type guard for error-type response events seen for the Advnaced Trade WS channel
 */
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

  const looselyTypedEvent = evt as WsExchangeRequestOperation<TWSTopic>;

  if (
    typeof looselyTypedEvent.type !== 'string' ||
    !Array.isArray(looselyTypedEvent.channels)
  ) {
    return false;
  }

  return (
    wsKey === WS_KEY_MAP.exchangeDirectMarketData ||
    wsKey === WS_KEY_MAP.exchangeMarketData
  );
}

/**
 * Silly type guard for the structure of events being sent to the server
 * (e.g. when subscribing to a topic)
 */
export function isCBINTXWSRequestOperation<TWSTopic extends string = string>(
  evt: unknown,
  wsKey: WsKey,
): evt is WsInternationalRequestOperation<TWSTopic> {
  if (!isDefinedObject(evt)) {
    return false;
  }

  const looselyTypedEvent = evt as WsInternationalRequestOperation<TWSTopic>;

  if (
    typeof looselyTypedEvent.type !== 'string' ||
    !Array.isArray(looselyTypedEvent.channels)
  ) {
    return false;
  }

  return wsKey === WS_KEY_MAP.internationalMarketData;
}

/**
 * Silly type guard for the structure of events being sent to the server
 * (e.g. when subscribing to a topic)
 */
export function isCBPrimeWSRequestOperation<TWSTopic extends string = string>(
  evt: unknown,
  wsKey: WsKey,
): evt is WsPrimeRequestOperation<TWSTopic> {
  if (!isDefinedObject(evt)) {
    return false;
  }

  const looselyTypedEvent = evt as WsPrimeRequestOperation<TWSTopic>;

  if (
    typeof looselyTypedEvent.type !== 'string' ||
    typeof looselyTypedEvent.channel !== 'string'
  ) {
    return false;
  }

  return wsKey === WS_KEY_MAP.internationalMarketData;
}
