import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import https from 'https';

import { neverGuard } from './misc-util.js';
import {
  getRestBaseUrl,
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

    this.globalRequestOptions = {
      /** in ms == 5 minutes by default */
      timeout: 1000 * 60 * 5,
      /** inject custom rquest options based on axios specs - see axios docs for more guidance on AxiosRequestConfig: https://github.com/axios/axios#request-config */
      ...networkOptions,
      headers: {
        'Content-Type': 'application/json',
        locale: 'en-US',
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

    this.apiKey = this.options.apiKey;
    this.apiSecret = this.options.apiSecret;
    this.apiPassphrase = this.options.apiPassphrase;

    // Throw if one of the 3 values is missing, but at least one of them is set
    const credentials = [this.apiKey, this.apiSecret, this.apiPassphrase];
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

  get(endpoint: string, params?: any) {
    return this._call('GET', endpoint, params, true);
  }

  post(endpoint: string, params?: any) {
    return this._call('POST', endpoint, params, true);
  }

  getPrivate(endpoint: string, params?: any) {
    return this._call('GET', endpoint, params, false);
  }

  postPrivate(endpoint: string, params?: any) {
    return this._call('POST', endpoint, params, false);
  }

  deletePrivate(endpoint: string, params?: any) {
    return this._call('DELETE', endpoint, params, false);
  }

  putPrivate(endpoint: string, params?: any) {
    return this._call('PUT', endpoint, params, false);
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoint API calls are automatically signed.
   */
  private async _call(
    method: Method,
    endpoint: string,
    params?: any,
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
      },
      requestParams,
    };
  }

  /**
   * @private sign request and set recv window
   */
  private async signRequest<T extends object | undefined = {}>(
    data: T,
    endpoint: string,
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

    if (!this.apiKey || !this.apiSecret) {
      return res;
    }

    const strictParamValidation = this.options.strictParamValidation;
    const encodeQueryStringValues = true;

    if (signMethod === 'coinbase') {
      const signRequestParams =
        method === 'GET' || method === 'DELETE'
          ? serializeParams(
              data,
              strictParamValidation,
              encodeQueryStringValues,
              '?',
            )
          : JSON.stringify(data) || '';

      const paramsStr = `${timestamp}${method}/${endpoint}${signRequestParams}`;

      res.sign = await signMessage(
        paramsStr,
        this.apiSecret,
        'base64',
        'SHA-256',
      );

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
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: true,
  ): Promise<UnsignedRequest<TParams>>;
  private async prepareSignParams<TParams extends object | undefined>(
    method: Method,
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: false | undefined,
  ): Promise<SignedRequest<TParams>>;
  private async prepareSignParams<TParams extends object | undefined>(
    method: Method,
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

    if (!this.apiKey || !this.apiSecret || !this.apiPassphrase) {
      throw new Error(MISSING_API_KEYS_ERROR);
    }

    return this.signRequest(params, endpoint, method, signMethod);
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

    for (const key in params) {
      if (typeof params[key] === 'undefined') {
        delete params[key];
      }
    }

    if (isPublicApi || !this.apiKey || !this.apiSecret) {
      return {
        ...options,
        params: params,
      };
    }

    const signResult = await this.prepareSignParams(
      method,
      endpoint,
      'coinbase',
      params,
      isPublicApi,
    );

    const authHeaders = {
      'KC-API-KEY': this.apiKey,
      'KC-API-TIMESTAMP': signResult.timestamp,
    };

    const partnerSignParam = `${authHeaders['KC-API-TIMESTAMP']}${authHeaders['KC-API-KEY']}`;
    const partnerSign = 'sadfasdf';

    const partnerSignResult = await signMessage(
      partnerSignParam,
      partnerSign,
      'base64',
      'SHA-256',
    );
    const signedPassphrase = await signMessage(
      this.apiPassphrase!,
      this.apiSecret,
      'base64',
      'SHA-256',
    );

    if (method === 'GET') {
      return {
        ...options,
        headers: {
          ...authHeaders,
          ...options.headers,
          'KC-API-SIGN': signResult.sign,
          'KC-API-PARTNER-SIGN': partnerSignResult,
          'KC-API-PASSPHRASE': signedPassphrase,
        },
        url: options.url + signResult.queryParamsWithSign,
      };
    }

    return {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
        'KC-API-SIGN': signResult.sign,
        'KC-API-PARTNER-SIGN': partnerSignResult,
        'KC-API-PASSPHRASE': signedPassphrase,
      },
      data: params,
    };
  }
}
