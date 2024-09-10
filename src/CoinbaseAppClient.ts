import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';

/**
 * REST client for Coinbase's Coinbase App API:
 * https://docs.cdp.coinbase.com/coinbase-app/docs/welcome
 */
export class CoinbaseAppClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.advancedTrade;
  }

  /**
   *
   * Misc Utility Methods
   *
   */

  generateNewOrderID(): string {
    return nanoid(32);
  }

  /**
   *
   * Account Endpoints
   *
   */

  /**
   * List Accounts
   *
   * Get a list of authenticated accounts for the current user.
   */
  listAccounts(params?: {
    limit?: number;
    cursor?: string;
    retail_portfolio_id?: string; // deprecated
  }): Promise<any> {
    return this.getPrivate(`/v2/accounts`, params);
  }
}
