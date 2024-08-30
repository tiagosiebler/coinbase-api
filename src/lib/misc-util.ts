export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "${x}", ${msg}`);
}
