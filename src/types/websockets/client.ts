/** General configuration for the WebsocketClient */
export interface WSClientConfigurableOptions {
  /** Your API key */
  apiKey?: string;

  /** Your API secret */
  apiSecret?: string;

  /** Your API passphrase (can be anything) that you included when creating this API key */
  apiPassphrase?: string;

  /** Define a recv window when preparing a private websocket signature. This is in milliseconds, so 5000 == 5 seconds */
  recvWindow?: number;

  /** How often to check if the connection is alive */
  pingInterval?: number;

  /** How long to wait for a pong (heartbeat reply) before assuming the connection is dead */
  pongTimeout?: number;

  /** Delay in milliseconds before respawning the connection */
  reconnectTimeout?: number;

  wsUrl?: string;

  /**
   * Allows you to provide a custom "signMessage" function, e.g. to use node's much faster createHmac method
   *
   * Look in the examples folder for a demonstration on using node's createHmac instead.
   */
  customSignMessageFn?: (message: string, secret: string) => Promise<string>;

  /**
   * If you authenticated the WS API before, automatically try to re-authenticate the WS API if you're disconnected/reconnected for any reason.
   */
  reauthWSAPIOnReconnect?: boolean;
}

/**
 * WS configuration that's always defined, regardless of user configuration
 * (usually comes from defaults if there's no user-provided values)
 */
export interface WebsocketClientOptions extends WSClientConfigurableOptions {
  pingInterval: number;
  pongTimeout: number;
  reconnectTimeout: number;
  recvWindow: number;
  /**
   * If true, require a "receipt" that the connection is ready for use (e.g. a specific event type)
   */
  requireConnectionReadyConfirmation: boolean;
  authPrivateConnectionsOnConnect: boolean;
  authPrivateRequests: boolean;
  reauthWSAPIOnReconnect: boolean;
}

export type WsMarket = 'advancedTrade';
