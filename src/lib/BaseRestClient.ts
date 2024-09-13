/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import https from 'https';
import { nanoid } from 'nanoid';

import {
  CloseAdvTradePositionRequest,
  SubmitAdvTradeOrderRequest,
} from '../types/request/advanced-trade-client.js';
import { CustomOrderIdProperty } from '../types/shared.types.js';
import { signJWT } from './jwtNode.js';
import { neverGuard } from './misc-util.js';
import {
  APIIDPrefix,
  getRestBaseUrl,
  logInvalidOrderId,
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
}

interface UnsignedRequest<T extends object | undefined = {}> {
  originalParams: T;
  paramsWithSign: T;
}

type SignMethod = 'coinbase';

/**
 * Some requests require some params to be in the query string and some in the body.
 * This type anticipates both are possible in any combination.
 *
 * The request builder will automatically handle where parameters should go.
 */
type ParamsInQueryAndOrBody = { query?: object; body?: object };

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
  private apiKeyName: string | undefined;
  private apiKeySecret: string | undefined;

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
    const USER_AGENT = `coinbase-api-node/${VERSION}`;

    this.globalRequestOptions = {
      /** in ms == 5 minutes by default */
      timeout: 1000 * 60 * 5,
      /** inject custom rquest options based on axios specs - see axios docs for more guidance on AxiosRequestConfig: https://github.com/axios/axios#request-config */
      ...networkOptions,
      headers: {
        'Content-Type': 'application/json',
        locale: 'en-US',
        'User-Agent': USER_AGENT,
      },
    };

    // If enabled, configure a https agent with keepAlive enabled
    if (this.options.keepAlive) {
      // For more advanced configuration, raise an issue on GitHub or use the "networkOptions"
      // parameter to define a custom httpsAgent with the desired properties
      this.globalRequestOptions.httpsAgent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: this.options.keepAliveMsecs,
      });
    }

    this.baseUrl = getRestBaseUrl(
      false,
      restClientOptions,
      this.getClientType(),
    );

    this.apiKeyName = this.options.apiKeyName;
    this.apiKeySecret = this.options.apiPrivateKey;

    if (restClientOptions.cdpApiKey) {
      this.apiKeyName = restClientOptions.cdpApiKey.name;
      this.apiKeySecret = restClientOptions.cdpApiKey.privateKey;
    }

    // Throw if one of the 3 values is missing, but at least one of them is set
    const credentials = [this.apiKeyName, this.apiKeySecret];
    if (
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

  post(endpoint: string, params?: ParamsInQueryAndOrBody) {
    return this._call('POST', endpoint, params, true);
  }

  getPrivate(endpoint: string, params?: object) {
    return this._call('GET', endpoint, params, false);
  }

  postPrivate(endpoint: string, params?: ParamsInQueryAndOrBody) {
    return this._call('POST', endpoint, params, false);
  }

  deletePrivate(endpoint: string, params?: ParamsInQueryAndOrBody) {
    return this._call('DELETE', endpoint, params, false);
  }

  putPrivate(endpoint: string, params?: ParamsInQueryAndOrBody) {
    return this._call('PUT', endpoint, params, false);
  }

  patchPrivate(endpoint: string, params?: ParamsInQueryAndOrBody) {
    return this._call('PATCH', endpoint, params, false);
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoint API calls are automatically signed.
   */
  private async _call(
    method: Method,
    endpoint: string,
    params?: ParamsInQueryAndOrBody,
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
        if (response.status == 200) {
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
    return APIIDPrefix + nanoid(30);
  }

  /**
   * Validate syntax meets requirements set by binance. Log warning if not.
   */
  protected validateOrderId(
    params: SubmitAdvTradeOrderRequest | CloseAdvTradePositionRequest,
    orderIdProperty: CustomOrderIdProperty,
  ): void {
    if (!params[orderIdProperty]) {
      params[orderIdProperty] = this.generateNewOrderId();
      return;
    }

    if (!params[orderIdProperty].startsWith(APIIDPrefix)) {
      logInvalidOrderId(orderIdProperty, APIIDPrefix, params);

      const previousValue = params[orderIdProperty];
      const newValue = APIIDPrefix + params[orderIdProperty];
      console.warn(
        `WARNING: "${orderIdProperty}" was automatically prefixed. Changed from "${previousValue}" to "${newValue}". To avoid this, apply the prefix before submitting an order or use the client.generateNewOrderId() utility method.`,
      );

      params[orderIdProperty] = newValue;
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
        apiKeyName: 'omittedFromError',
        apiPrivateKey: 'omittedFromError',
        cdpApiKey: 'omittedFromError',
      },
      requestParams,
    };
  }

  /**
   * @private sign request and set recv window
   */
  private async signRequest<T extends ParamsInQueryAndOrBody | undefined = {}>(
    data: T,
    url: string,
    _endpoint: string,
    method: Method,
    signMethod: SignMethod,
  ): Promise<SignedRequest<T>> {
    const timestamp = this.getSignTimestampMs();

    const res: SignedRequest<T> = {
      originalParams: {
        ...data,
      },
      sign: '',
      timestamp,
      recvWindow: 0,
      serializedParams: '',
      queryParamsWithSign: '',
    };

    const apiKey = this.apiKeyName;
    const apiSecret = this.apiKeySecret;

    if (!apiKey || !apiSecret) {
      return res;
    }

    const strictParamValidation = this.options.strictParamValidation;
    const encodeQueryStringValues = true;

    const requestBodyToSign = res.originalParams?.body
      ? JSON.stringify(res.originalParams?.body)
      : '';

    if (signMethod === 'coinbase') {
      const signRequestParams =
        method === 'GET'
          ? serializeParams(
              data?.query || data,
              strictParamValidation,
              encodeQueryStringValues,
              '?',
            )
          : JSON.stringify(data?.body || data) || '';

      res.sign = signJWT(url, method, 'ES256', apiKey, apiSecret);
      res.queryParamsWithSign = signRequestParams;
      return res;
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

    if (!this.apiKeyName || !this.apiKeySecret) {
      throw new Error(MISSING_API_KEYS_ERROR);
    }

    return this.signRequest(params, url, endpoint, method, signMethod);
  }

  /** Returns an axios request object. Handles signing process automatically if this is a private API call */
  private async buildRequest(
    method: Method,
    endpoint: string,
    url: string,
    params?: any,
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

    if (isPublicApi || !this.apiKeyName || !this.apiKeySecret) {
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

    const authHeaders = {
      Authorization: `Bearer ${signResult.sign}`,
    };

    const urlWithQueryParams =
      options.url + '?' + signResult.queryParamsWithSign;

    if (method === 'GET' || !params?.body) {
      return {
        ...options,
        headers: {
          ...authHeaders,
          ...options.headers,
        },
        url: urlWithQueryParams,
      };
    }

    return {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
      url: params?.query ? urlWithQueryParams : options.url,
      data: signResult.originalParams.body,
    };
  }
}
