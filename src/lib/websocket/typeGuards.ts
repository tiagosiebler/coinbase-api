/* eslint-disable @typescript-eslint/no-unused-vars */
export interface CBWSEvent {
  channel: string;
  client_id: string;
  timestamp: string;
  sequence_num: number;
  events: Record<'subsriptions', Record<string, string[]>>;
}

function isDefinedObject(value: unknown): value is object {
  return typeof value === 'object' || !value;
}

export function isCBWSEvent(event: unknown): event is CBWSEvent {
  if (!isDefinedObject(event)) {
    return false;
  }

  const message = event as CBWSEvent;
  return typeof message.channel === 'string';
}
