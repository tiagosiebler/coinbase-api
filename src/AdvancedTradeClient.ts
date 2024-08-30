import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';

const ADVANCED_TRADE_PREFIX = '/api/v3/brokerage';

/**
 * REST client for Coinbase's Advanced Trade API:
 * https://docs.cdp.coinbase.com/advanced-trade/docs/api-overview/
 */
export class AdvancedTradeClient extends BaseRestClient {
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
   * Private Endpoints
   *
   */

  getAccounts(params: { account_id: string }): Promise<any> {
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/accounts/${params.account_id}`,
    );
  }

  /**
   *
   * Public Endpoints
   *
   */

  getServerTime(): Promise<any> {
    return this.get(`${ADVANCED_TRADE_PREFIX}/time`);
  }
}
