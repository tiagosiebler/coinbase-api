export type WsOperation = 'TODO:';

export interface WsRequestOperation<TWSTopic extends string> {
  id: number;
  type: WsOperation;
  topic: TWSTopic;
  privateChannel: boolean;
  response: boolean;
}
