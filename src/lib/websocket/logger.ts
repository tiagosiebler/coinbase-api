export type LogParams = null | any;

export const DefaultLogger = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trace: (..._params: LogParams): void => {
    // console.log(_params);
  },
  info: (...params: LogParams): void => {
    console.info(params);
  },
  error: (...params: LogParams): void => {
    console.error(params);
  },
};
