export interface WsDataEvent<TData = any, TWSKey = string> {
  data: TData;
  table: string;
  wsKey: TWSKey;
}
