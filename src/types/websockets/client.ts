import type { ClientRequestArgs } from 'http';
import WebSocket from 'isomorphic-ws';

/** General configuration for the WebsocketClient */
export interface WSClientConfigurableOptions {
  /**
   * Your API key name.
   *
   * - For the Advanced Trade or App APIs, this is your API Key Name.
   */
  apiKey?: string;

  /**
   * Your API key secret.
   *
   * - For the Advanced Trade or App APIs, this is your API private key (including the -----BEGIN EC PRIVATE KEY-----\n etc).
   */
  apiSecret?: string;

  /**
   * Your API passphrase (NOT your account password). Only used for the API groups that use an API passphrase:
   * - Coinbase Exchange API
   * - Coinbase International API
   * - Coinbase Prime API
   */
  apiPassphrase?: string;

  /**
   * For JWT auth (adv trade & app API), seconds until jwt expires. Defaults to 120 seconds.
   */
  jwtExpiresSeconds?: number;

  /** How often to check if the connection is alive */
  pingInterval?: number;

  /** How long to wait for a pong (heartbeat reply) before assuming the connection is dead */
  pongTimeout?: number;

  /** Delay in milliseconds before respawning the connection */
  reconnectTimeout?: number;

  wsUrl?: string;

  wsOptions?: {
    protocols?: string[];
    agent?: any;
  } & Partial<WebSocket.ClientOptions | ClientRequestArgs>;

  /**
   * Connect to the sandbox for supported products
   *
   * - Coinbase Exchange: https://docs.cdp.coinbase.com/exchange/docs/sandbox
   * - Coinbase International: https://docs.cdp.coinbase.com/intx/docs/sandbox
   *
   * - Coinbase App: No sandbox available.
   * - Coinbase Advanced Trade: No sandbox available.
   * - Coinbase Prime: No sandbox available.
   */
  useSandbox?: boolean;

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
  useSandbox: boolean;
  recvWindow: number;
  /**
   * If true, require a "receipt" that the connection is ready for use (e.g. a specific event type)
   */
  requireConnectionReadyConfirmation: boolean;
  authPrivateConnectionsOnConnect: boolean;
  authPrivateRequests: boolean;
  reauthWSAPIOnReconnect: boolean;
}

export type WsMarket = 'advancedTrade' | 'exchange' | 'international' | 'prime';
