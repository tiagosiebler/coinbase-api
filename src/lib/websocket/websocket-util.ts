import WebSocket from 'isomorphic-ws';

/** Should be one WS key per unique URL */
export const WS_KEY_MAP = {
  spotPublicV1: 'spotPublicV1',
  spotPrivateV1: 'spotPrivateV1',
  futuresPublicV1: 'futuresPublicV1',
  futuresPrivateV1: 'futuresPrivateV1',
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
