import { CustomOrderIdProperty } from '../types/shared.types.js';

/**
 * Used to switch how authentication/requests work under the hood
 */
export const REST_CLIENT_TYPE_ENUM = {
  /** Coinbase Advanced Trade API */
  advancedTrade: 'advancedTrade',
  /** Coinbase App API */
  coinbaseApp: 'coinbaseApp',
  /** Coinbase Exchange API */
  exchange: 'exchange',
  /** Coinbase Prime API */
  prime: 'prime',
  /** Coinbase International API */
  international: 'international',
  /** Coinbase Commerce API */
  commerce: 'commerce',
} as const;

export type RestClientType =
  (typeof REST_CLIENT_TYPE_ENUM)[keyof typeof REST_CLIENT_TYPE_ENUM];

const exchangeBaseURLMap = {
  [REST_CLIENT_TYPE_ENUM.advancedTrade]: 'https://api.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.coinbaseApp]: 'https://api.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.exchange]: 'https://api.exchange.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.prime]: 'https://api.prime.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.international]:
    'https://api.international.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.commerce]: 'https://api.commerce.coinbase.com',
} as const;

const exchangeSandboxURLMap = {
  [REST_CLIENT_TYPE_ENUM.exchange]:
    'https://api-public.sandbox.exchange.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.international]: 'https://api-n5e1.coinbase.com',
  [REST_CLIENT_TYPE_ENUM.advancedTrade]: 'NoSandboxAvailable',
  [REST_CLIENT_TYPE_ENUM.coinbaseApp]: 'NoSandboxAvailable',
  [REST_CLIENT_TYPE_ENUM.prime]: 'NoSandboxAvailable',
  [REST_CLIENT_TYPE_ENUM.commerce]: 'NoSandboxAvailable',
} as const;

export interface RestClientOptions {
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
   * For the Advanced Trade or App APIs, instead of passing the key name and
   * private key, you can also parse the exported "cdp_api_key.json" into an object and pass it here.
   *
   * It will automatically get parsed into the apiKey & apiSecret configuration parameters.
   */
  cdpApiKey?: {
    name: string;
    privateKey: string;
  };

  /**
   * https://docs.cdp.coinbase.com/coinbase-app/docs/localization
   *
   * The Coinbase App API supports localization for error messages and other strings.
   * Localization is defined in each request with Accept-Language header.
   *
   * Accepted values are currently as below. Note: this may not work for all coinbase product groups.
   */
  localisation?:
    | 'de'
    | 'en'
    | 'es'
    | 'es-mx'
    | 'fr'
    | 'id'
    | 'it'
    | 'nl'
    | 'pt'
    | 'pt-br';

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

  /**
   * For JWT auth (adv trade & app API), seconds until jwt expires. Defaults to 120 seconds.
   */
  jwtExpiresSeconds?: number;

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
  explodeArrayParameters: boolean,
): string {
  if (!params) {
    return '';
  }

  let queryParams = prefixWith || '';

  const valueKeys = Object.keys(params).sort();
  for (const key of valueKeys) {
    const value = params[key];
    if (strict_validation === true && typeof value === 'undefined') {
      throw new Error('Failed to sign API request due to undefined parameter');
    }

    /**
     * Coinbase expected array parameters to be sent individually in GET requests, e.g:
     * ?order_side=SELL&order_status=OPEN&product_ids=BTC-USDC&product_ids=ETH-USDC
     *
     * This handles that repetition instead of sending arrays as-is
     */
    if (explodeArrayParameters && Array.isArray(value)) {
      for (const arrValue of value) {
        if (queryParams && queryParams !== prefixWith) {
          queryParams += '&';
        }

        const encodedValue = encodeValues
          ? encodeURIComponent(`${arrValue}`)
          : `${arrValue}`;

        queryParams += `${key}=${encodedValue}`;
      }

      continue;
    }

    if (queryParams && queryParams !== prefixWith) {
      queryParams += '&';
    }

    const encodedValue = encodeValues ? encodeURIComponent(value) : value;
    queryParams += `${key}=${encodedValue}`;
  }

  // Only prefix if there's a value...
  if (queryParams === prefixWith) {
    return '';
  }

  return queryParams;
}

export const APIIDPrefix = 'cbnode';

export function logInvalidOrderId(
  orderIdProperty: CustomOrderIdProperty,
  expectedOrderIdPrefix: string,
  params: unknown,
) {
  console.error(
    `'${orderIdProperty}' must be prefixed with ${expectedOrderIdPrefix}. Use the 'client.generateNewOrderId()' REST client utility method to generate a fresh order ID on demand. Original request: ${JSON.stringify(
      params,
    )}`,
  );
}

export function getRestBaseUrl(
  restClientOptions: RestClientOptions,
  restClientType: RestClientType,
): string {
  const exchangeBaseUrls = {
    livenet: exchangeBaseURLMap[restClientType],
    testnet: exchangeSandboxURLMap[restClientType],
  };

  if (restClientOptions.baseUrl) {
    return restClientOptions.baseUrl;
  }

  if (restClientOptions.useSandbox === true) {
    return exchangeBaseUrls.testnet;
  }

  return exchangeBaseUrls.livenet;
}

/**
 * Extract and separate request parameters in query string from the rest of the endpoint, to prevent sign issues.
 *
 * @param url endpoint containing params in query string; "/v2/accounts/123123213?someParam=xyz"
 * @returns
 */
export function getParamsFromURL(url: string): {
  endpoint: string;
  params: any;
} {
  const [endpoint, paramsStr] = url.split('?');
  if (!paramsStr) {
    return {
      endpoint: url,
      params: {},
    };
  }

  const result = {
    endpoint: endpoint,
    params: {} as Record<string, string>,
  };

  (paramsStr || '').split('&').forEach((param) => {
    const [key, value] = param.split('=');
    result.params[key] = value;
  });

  return result;
}
