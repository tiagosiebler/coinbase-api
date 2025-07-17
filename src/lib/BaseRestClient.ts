import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import https from 'https';
import { nanoid } from 'nanoid';

import {
  CloseAdvTradePositionRequest,
  SubmitAdvTradeOrderRequest,
} from '../types/request/advanced-trade-client.js';
import { SubmitCBExchOrderRequest } from '../types/request/coinbase-exchange.js';
import { SubmitINTXOrderRequest } from '../types/request/coinbase-international.js';
import { SubmitPrimeOrderRequest } from '../types/request/coinbase-prime.js';
import { CustomOrderIdProperty } from '../types/shared.types.js';
import { signJWT } from './jwtNode.js';
import { neverGuard } from './misc-util.js';
import {
  APIIDPrefix,
  getRestBaseUrl,
  logInvalidOrderId,
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
  serializeParams,
} from './requestUtils.js';
import { signMessage } from './webCryptoAPI.js';

const MISSING_API_KEYS_ERROR =
  'API Key, Secret & API Passphrase are ALL required to use the authenticated REST client';

interface SignedRequest<T extends object | undefined = {}> {
  originalParams: T;
  paramsWithSign?: T & { sign: string };
  serializedParams: string;
  sign: string;
  queryParamsWithSign: string;
  timestamp: number;
  recvWindow: number;
  headers: object;
}

interface UnsignedRequest<T extends object | undefined = {}> {
  originalParams: T;
  paramsWithSign: T;
}

type SignMethod = 'coinbase';

/**
 * Some requests require some params to be in the query string, some in the body, some even in the headers.
 * This type anticipates either are possible in any combination.
 *
 * The request builder will automatically handle where parameters should go.
 */
type ParamsInRequest = {
  query?: object;
  body?: object;
  headers?: object;
};

const ENABLE_HTTP_TRACE =
  typeof process === 'object' &&
  typeof process.env === 'object' &&
  process.env.CBTRACE;

if (ENABLE_HTTP_TRACE) {
  axios.interceptors.request.use((request) => {
    console.log(
      new Date(),
      'Starting Request',
      JSON.stringify(
        {
          url: request.url,
          method: request.method,
          params: request.params,
          data: request.data,
        },
        null,
        2,
      ),
    );
    return request;
  });
  axios.interceptors.response.use((response) => {
    console.log(new Date(), 'Response:', {
      // request: {
      //   url: response.config.url,
      //   method: response.config.method,
      //   data: response.config.data,
      //   headers: response.config.headers,
      // },
      response: {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: JSON.stringify(response.data, null, 2),
      },
    });
    return response;
  });
}

/**
 * Impure, mutates params to remove any values that have a key but are undefined.
 */
function deleteUndefinedValues(params?: any): void {
  if (!params) {
    return;
  }

  for (const key in params) {
    const value = params[key];
    if (typeof value === 'undefined') {
      delete params[key];
    }
  }
}

export abstract class BaseRestClient {
  private options: RestClientOptions;

  private baseUrl: string;

  private globalRequestOptions: AxiosRequestConfig;

  private apiKey: string | undefined;

  private apiSecret: string | undefined;

  private apiPassphrase: string | undefined;

  /** Defines the client type (affecting how requests & signatures behave) */
  abstract getClientType(): RestClientType;

  /**
   * Create an instance of the REST client. Pass API credentials in the object in the first parameter.
   * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [networkOptions={}] HTTP networking options for axios
   */
  constructor(
    restClientOptions: RestClientOptions = {},
    networkOptions: AxiosRequestConfig = {},
  ) {
    this.options = {
      /** Throw errors if any request params are empty */
      strictParamValidation: false,
      ...restClientOptions,
    };

    const VERSION = '0.1.0';
    const USER_AGENT = `${APIIDPrefix}/${VERSION}`;

    this.globalRequestOptions = {
      /** in ms == 5 minutes by default */
      timeout: 1000 * 60 * 5,
      /** inject custom rquest options based on axios specs - see axios docs for more guidance on AxiosRequestConfig: https://github.com/axios/axios#request-config */
      ...networkOptions,
      headers: {
        ...networkOptions.headers,
        'Content-Type': 'application/json',
        locale: 'en-US',
        'User-Agent': USER_AGENT,
      },
    };

    if (restClientOptions.localisation) {
      if (!this.globalRequestOptions.headers) {
        this.globalRequestOptions.headers = {};
      }

      this.globalRequestOptions.headers['Accept-Language'] =
        restClientOptions.localisation;
    }

    // If enabled, configure a https agent with keepAlive enabled
    if (this.options.keepAlive) {
      // Extract existing https agent parameters, if provided, to prevent the keepAlive flag from overwriting an existing https agent completely
      const existingHttpsAgent = this.globalRequestOptions.httpsAgent as
        | https.Agent
        | undefined;
      const existingAgentOptions = existingHttpsAgent?.options || {};

      // For more advanced configuration, raise an issue on GitHub or use the "networkOptions"
      // parameter to define a custom httpsAgent with the desired properties
      this.globalRequestOptions.httpsAgent = new https.Agent({
        ...existingAgentOptions,
        keepAlive: true,
        keepAliveMsecs: this.options.keepAliveMsecs,
      });
    }

    this.baseUrl = getRestBaseUrl(restClientOptions, this.getClientType());

    // Newline escapes needed, if passed as env vars
    this.apiKey = this.options.apiKey;
    this.apiSecret = this.options.apiSecret?.replace(/\\n/g, '\n');
    this.apiPassphrase = this.options.apiPassphrase;

    if (restClientOptions.cdpApiKey) {
      this.apiKey = restClientOptions.cdpApiKey.name;
      this.apiSecret = restClientOptions.cdpApiKey.privateKey?.replace(
        /\\n/g,
        '\n',
      );
    }

    // Throw if one of these values is missing, and at least one of them is set

    const credentials = [this.apiKey, this.apiSecret];
    if (
      // commerce only needs keys, not key and secret
      this.getClientType() !== REST_CLIENT_TYPE_ENUM.commerce &&
      credentials.includes(undefined) &&
      credentials.some((v) => typeof v === 'string')
    ) {
      throw new Error(MISSING_API_KEYS_ERROR);
    }
  }

  /**
   * Timestamp used to sign the request. Override this method to implement your own timestamp/sync mechanism
   */
  getSignTimestampMs(): number {
    return Date.now();
  }

  get(endpoint: string, params?: object) {
    return this._call('GET', endpoint, params, true);
  }

  post(endpoint: string, params?: ParamsInRequest) {
    return this._call('POST', endpoint, params, true);
  }

  getPrivate(endpoint: string, params?: object) {
    return this._call('GET', endpoint, params, false);
  }

  postPrivate(endpoint: string, params?: ParamsInRequest) {
    return this._call('POST', endpoint, params, false);
  }

  deletePrivate(endpoint: string, params?: ParamsInRequest) {
    return this._call('DELETE', endpoint, params, false);
  }

  putPrivate(endpoint: string, params?: ParamsInRequest) {
    return this._call('PUT', endpoint, params, false);
  }

  patchPrivate(endpoint: string, params?: ParamsInRequest) {
    return this._call('PATCH', endpoint, params, false);
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoint API calls are automatically signed.
   */
  private async _call(
    method: Method,
    endpoint: string,
    params?: ParamsInRequest,
    isPublicApi?: boolean,
  ): Promise<any> {
    // Sanity check to make sure it's only ever prefixed by one forward slash
    const requestUrl = [this.baseUrl, endpoint].join(
      endpoint.startsWith('/') ? '' : '/',
    );

    // Build a request and handle signature process
    const options = await this.buildRequest(
      method,
      endpoint,
      requestUrl,
      params,
      isPublicApi,
    );

    if (ENABLE_HTTP_TRACE) {
      console.log('full request: ', options);
    }

    // Dispatch request
    return axios(options)
      .then((response) => {
        if (response.status >= 200 && response.status <= 204) {
          // Throw if API returns an error (e.g. insufficient balance)
          if (
            typeof response.data?.code === 'string' &&
            response.data?.code !== '200000'
          ) {
            throw { response };
          }

          return response.data;
        }
        throw { response };
      })
      .catch((e) =>
        this.parseException(e, { method, endpoint, requestUrl, params }),
      );
  }

  public generateNewOrderId(): string {
    return APIIDPrefix + nanoid(14);
  }

  /**
   * Validate syntax meets requirements set by coinbase. Log warning if not.
   */
  protected validateOrderId(
    params:
      | SubmitAdvTradeOrderRequest
      | CloseAdvTradePositionRequest
      | SubmitCBExchOrderRequest
      | SubmitINTXOrderRequest
      | SubmitPrimeOrderRequest,
    orderIdProperty: CustomOrderIdProperty,
  ): void {
    // Not the cleanest but strict checks aren't quite necessary here either
    const requestParams = params as any;

    if (!requestParams[orderIdProperty]) {
      requestParams[orderIdProperty] = this.generateNewOrderId();
      return;
    }

    if (!requestParams[orderIdProperty].startsWith(APIIDPrefix)) {
      logInvalidOrderId(orderIdProperty, APIIDPrefix, params);

      const previousValue = requestParams[orderIdProperty];
      const newValue = APIIDPrefix + requestParams[orderIdProperty];
      console.warn(
        `WARNING: "${orderIdProperty}" was automatically prefixed. Changed from "${previousValue}" to "${newValue}". To avoid this, apply the prefix before submitting an order or use the client.generateNewOrderId() utility method.`,
      );

      requestParams[orderIdProperty] = newValue;
    }
  }

  /**
   * @private generic handler to parse request exceptions
   */
  parseException(e: any, requestParams: any): unknown {
    if (this.options.parseExceptions === false) {
      throw e;
    }

    // Something happened in setting up the request that triggered an error
    if (!e.response) {
      if (!e.request) {
        throw e.message;
      }

      // request made but no response received
      throw e;
    }

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const response: AxiosResponse = e.response;
    // console.error('err: ', response?.data);

    throw {
      code: response.status,
      message: response.statusText,
      body: response.data,
      headers: response.headers,
      requestOptions: {
        ...this.options,
        // Prevent credentials from leaking into error messages
        apiKey: 'omittedFromError',
        apiSecret: 'omittedFromError',
        apiPassphrase: 'omittedFromError',
        cdpApiKey: 'omittedFromError',
      },
      requestParams,
    };
  }

  /**
   * @private sign request and set recv window
   */
  private async signRequest<T extends ParamsInRequest | undefined = {}>(
    data: T,
    url: string,
    endpoint: string,
    method: Method,
    signMethod: SignMethod,
  ): Promise<SignedRequest<T>> {
    const timestampInMs = this.getSignTimestampMs();

    const res: SignedRequest<T> = {
      originalParams: {
        ...data,
      },
      sign: '',
      timestamp: timestampInMs,
      recvWindow: 0,
      serializedParams: '',
      queryParamsWithSign: '',
      headers: {},
    };

    const apiKey = this.apiKey;
    const apiSecret = this.apiSecret;
    const apiPassphrase = this.apiPassphrase;
    const jwtExpiresSeconds = this.options.jwtExpiresSeconds || 120;

    if (!apiKey) {
      return res;
    }

    const strictParamValidation = this.options.strictParamValidation;
    const encodeQueryStringValues = true;
    const explodeArrayParameters = true;

    // if there is body, use body - otherwise empty string
    const requestBody = data?.body;
    const requestBodyString = requestBody ? JSON.stringify(requestBody) : '';

    if (signMethod === 'coinbase') {
      const clientType = this.getClientType();

      const signRequestParams =
        method === 'GET' || method === 'DELETE'
          ? serializeParams(
              data?.query || data,
              strictParamValidation,
              encodeQueryStringValues,
              '?',
              explodeArrayParameters,
            )
          : requestBodyString;

      // https://docs.cdp.coinbase.com/product-apis/docs/welcome
      switch (clientType) {
        case REST_CLIENT_TYPE_ENUM.advancedTrade:
        case REST_CLIENT_TYPE_ENUM.coinbaseApp: {
          // Both adv trade & app API use the same JWT auth mechanism
          // Advanced Trade: https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth
          // App: https://docs.cdp.coinbase.com/coinbase-app/docs/api-key-authentication

          if (!apiSecret) {
            throw new Error('No API secret provided, cannot prepare JWT.');
          }

          const sign = await signJWT({
            url,
            method,
            algorithm: 'ES256',
            timestampMs: timestampInMs,
            jwtExpiresSeconds,
            apiPubKey: apiKey,
            apiPrivKey: apiSecret,
          });

          return {
            ...res,
            sign: sign,
            queryParamsWithSign: signRequestParams,
            headers: {
              Authorization: `Bearer ${sign}`,
            },
          };

          // TODO: is there demand for oauth support?
          // Docs: https://docs.cdp.coinbase.com/coinbase-app/docs/coinbase-app-integration
          // See: https://github.com/tiagosiebler/coinbase-api/issues/24
        }

        // Docs: https://docs.cdp.coinbase.com/exchange/docs/rest-auth
        case REST_CLIENT_TYPE_ENUM.exchange: {
          const timestampInSeconds = timestampInMs / 1000; // decimals are OK

          if (!apiSecret) {
            throw new Error('No API secret provided, cannot sign request.');
          }

          if (!apiPassphrase) {
            throw new Error('No API passphrase provided, cannot sign request.');
          }

          const signInput =
            timestampInSeconds + method + endpoint + signRequestParams;

          const sign = await signMessage(
            signInput,
            apiSecret,
            'base64',
            'SHA-256',
            'base64:web',
          );

          const headers = {
            'CB-ACCESS-KEY': apiKey,
            'CB-ACCESS-SIGN': sign,
            'CB-ACCESS-TIMESTAMP': timestampInSeconds,
            'CB-ACCESS-PASSPHRASE': apiPassphrase,
          };

          // console.log('sign res: ', { signInput, ...headers });
          return {
            ...res,
            sign: sign,
            queryParamsWithSign: signRequestParams,
            headers: {
              ...headers,
            },
          };

          // For CB Exchange, is there demand for FIX
          // Docs, FIX: https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity
        }

        // Docs: https://docs.cdp.coinbase.com/intx/docs/rest-auth
        case REST_CLIENT_TYPE_ENUM.international: {
          const timestampInSeconds = timestampInMs / 1000; // decimals are OK

          if (!apiSecret) {
            throw new Error('No API secret provided, cannot sign request.');
          }

          if (!apiPassphrase) {
            throw new Error('No API passphrase provided, cannot sign request.');
          }

          // For CB International, no query params are used in the signature
          const signInput =
            timestampInSeconds + method + endpoint + requestBodyString;

          const sign = await signMessage(
            signInput,
            apiSecret,
            'base64',
            'SHA-256',
            'base64:web',
          );

          const headers = {
            'CB-ACCESS-KEY': apiKey,
            'CB-ACCESS-SIGN': sign,
            'CB-ACCESS-TIMESTAMP': timestampInSeconds,
            'CB-ACCESS-PASSPHRASE': apiPassphrase,
          };

          // console.log('sign res: ', { signInput, ...headers });
          return {
            ...res,
            sign: sign,
            queryParamsWithSign: signRequestParams,
            headers: {
              ...headers,
            },
          };

          // For CB International, is there demand for FIX
          // Docs, FIX: https://docs.cdp.coinbase.com/intx/docs/fix-overview
        }

        // Docs: https://docs.cdp.coinbase.com/prime/docs/rest-authentication
        case REST_CLIENT_TYPE_ENUM.prime: {
          const timestampInSeconds = Math.floor(timestampInMs / 1000); // decimal not allowed

          const signInput =
            timestampInSeconds + method + endpoint + requestBodyString;

          if (!apiSecret) {
            throw new Error('No API secret provided, cannot sign request.');
          }

          if (!apiPassphrase) {
            throw new Error('No API passphrase provided, cannot sign request.');
          }

          const sign = await signMessage(
            signInput,
            apiSecret,
            'base64',
            'SHA-256',
            'base64:web',
          );

          const headers = {
            'X-CB-ACCESS-KEY': apiKey,
            'X-CB-ACCESS-PASSPHRASE': apiPassphrase,
            'X-CB-ACCESS-SIGNATURE': sign,
            'X-CB-ACCESS-TIMESTAMP': timestampInSeconds,
          };

          // For CB Prime, is there demand for FIX
          // Docs, FIX: https://docs.cdp.coinbase.com/prime/docs/fix-connectivity

          return {
            ...res,
            sign: sign,
            queryParamsWithSign: signRequestParams,
            headers: {
              ...headers,
            },
          };
        }
        case REST_CLIENT_TYPE_ENUM.commerce: {
          // https://docs.cdp.coinbase.com/commerce-onchain/docs/getting-started
          // No auth?
          return {
            ...res,
            headers: {
              'X-CC-Api-Key': apiKey,
            },
          };
        }
        default: {
          console.error(
            new Date(),
            neverGuard(
              clientType,
              `Unhandled sign client type : "${clientType}"`,
            ),
          );
          throw new Error(
            `Unhandled request sign for client : "${clientType}"`,
          );
        }
      }
    }

    console.error(
      new Date(),
      neverGuard(signMethod, `Unhandled sign method: "${signMessage}"`),
    );

    return res;
  }

  private async prepareSignParams<TParams extends object | undefined>(
    method: Method,
    url: string,
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: true,
  ): Promise<UnsignedRequest<TParams>>;

  private async prepareSignParams<TParams extends object | undefined>(
    method: Method,
    url: string,
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: false | undefined,
  ): Promise<SignedRequest<TParams>>;

  private async prepareSignParams<TParams extends object | undefined>(
    method: Method,
    url: string,
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: boolean,
  ) {
    if (isPublicApi) {
      return {
        originalParams: params,
        paramsWithSign: params,
      };
    }

    if (!this.apiKey || !this.apiSecret) {
      throw new Error(MISSING_API_KEYS_ERROR);
    }

    return this.signRequest(params, url, endpoint, method, signMethod);
  }

  /** Returns an axios request object. Handles signing process automatically if this is a private API call */
  private async buildRequest(
    method: Method,
    endpoint: string,
    url: string,
    params?: any | undefined,
    isPublicApi?: boolean,
  ): Promise<AxiosRequestConfig> {
    const options: AxiosRequestConfig = {
      ...this.globalRequestOptions,
      url: url,
      method: method,
    };

    deleteUndefinedValues(params);
    deleteUndefinedValues(params?.body);
    deleteUndefinedValues(params?.query);
    deleteUndefinedValues(params?.headers);

    if (isPublicApi || !this.apiKey || !this.apiSecret) {
      return {
        ...options,
        params: params,
      };
    }

    const signResult = await this.prepareSignParams(
      method,
      url,
      endpoint,
      'coinbase',
      params,
      isPublicApi,
    );

    const requestHeaders = {
      // request parameter headers for this request
      ...params?.headers,
      // auth headers for this request
      ...signResult.headers,
      // global headers for every request
      ...options.headers,
    };

    let urlWithQueryParams = options.url;

    if (method === 'GET' || method === 'DELETE') {
      if (signResult.queryParamsWithSign) {
        urlWithQueryParams += signResult.queryParamsWithSign;
      }
      return {
        ...options,
        headers: requestHeaders,
        url: urlWithQueryParams,
      };
    }

    return {
      ...options,
      headers: requestHeaders,
      url: params?.query ? urlWithQueryParams : options.url,
      data: signResult.originalParams.body,
    };
  }
}
