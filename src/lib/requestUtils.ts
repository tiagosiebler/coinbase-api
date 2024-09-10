/**
 * Used to switch how authentication/requests work under the hood
 */
export const REST_CLIENT_TYPE_ENUM = {
  /** Coinbase Advanced Trade API */
  advancedTrade: 'advancedTrade',
  /** Coinbase Exchange API */
  exchange: 'exchange',
  /** Coinbase Prime API */
  prime: 'prime',
} as const;

export type RestClientType =
  (typeof REST_CLIENT_TYPE_ENUM)[keyof typeof REST_CLIENT_TYPE_ENUM];

const exchangeBaseURLMap = {
  [REST_CLIENT_TYPE_ENUM.advancedTrade]: 'https://api.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.exchange]: 'https://api.exchange.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.prime]: 'https://api.prime.coinbase.com', // /v1
} as const;

export interface RestClientOptions {
  /** Your API key name */
  apiKeyName?: string;

  /** Your API Private Key */
  apiPrivateKey?: string;

  /**
   * Instead of passing the key name and private key,
   * you can also parse the exported "cdp_api_key.json" into an object and pass it here.
   */
  cdpApiKey?: {
    name: string;
    privateKey: string;
  };

  /**
   * Enable keep alive for REST API requests (via axios).
   * See: https://github.com/tiagosiebler/bybit-api/issues/368
   */
  keepAlive?: boolean;

  /**
   * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
   * Only relevant if keepAlive is set to true.
   * Default: 1000 (defaults comes from https agent)
   */
  keepAliveMsecs?: number;

  /** Default: false. If true, we'll throw errors if any params are undefined */
  strictParamValidation?: boolean;

  /**
   * Optionally override API protocol + domain
   * e.g baseUrl: 'https://api.differentUrl.com'
   **/
  baseUrl?: string;

  /** Default: true. whether to try and post-process request exceptions (and throw them). */
  parseExceptions?: boolean;
}

export function serializeParams<T extends Record<string, any> | undefined = {}>(
  params: T,
  strict_validation: boolean | undefined,
  encodeValues: boolean,
  prefixWith: string,
): string {
  if (!params) {
    return '';
  }

  const queryString = Object.keys(params)
    .sort()
    .map((key) => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error(
          'Failed to sign API request due to undefined parameter',
        );
      }
      const encodedValue = encodeValues ? encodeURIComponent(value) : value;
      return `${key}=${encodedValue}`;
    })
    .join('&');

  // Only prefix if there's a value
  return queryString ? prefixWith + queryString : queryString;
}

export const APIIDPrefix = 'cbnode';

export function getRestBaseUrl(
  useTestnet: boolean,
  restInverseOptions: RestClientOptions,
  restClientType: RestClientType,
): string {
  const exchangeBaseUrls = {
    livenet: exchangeBaseURLMap[restClientType],
    testnet: 'https://noTestnet',
  };

  if (restInverseOptions.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (useTestnet) {
    return exchangeBaseUrls.testnet;
  }

  return exchangeBaseUrls.livenet;
}
