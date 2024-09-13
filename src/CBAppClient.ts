import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  CBAppDepositFundsRequest,
  CBAppSendMoneyRequest,
  CBAppTransferMoneyRequest,
  CBAppWithdrawFundsRequest,
} from './types/request/coinbase-app-client.js';
import {
  CBAppAccount,
  CBAppAddress,
  CBAppCryptocurrency,
  CBAppDepositWithdrawal,
  CBAppFiatCurrency,
  CBAppPagination,
  CBAppTransaction,
} from './types/response/coinbase-app-client.js';

/**
 * REST client for Coinbase's Coinbase App API:
 * https://docs.cdp.coinbase.com/coinbase-app/docs/welcome
 */
export class CBAppClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.coinbaseApp;
  }

  /**
   *
   * Account Endpoints
   *
   */

  /**
   * List Accounts
   *
   * List a current user's accounts to which the authentication method has access to.
   *
   * This endpoint is paginated. In case you are calling it first time, leave paginationURL empty.
   * If you are paginating, provide the paginationURL value from the previous response and you will receive the next page of accounts.
   */
  getAccounts(params?: { paginationURL?: string }): Promise<{
    data: CBAppAccount[];
    pagination: CBAppPagination;
  }> {
    if (params?.paginationURL) {
      return this.getPrivate(params.paginationURL);
    }
    return this.getPrivate('/v2/accounts');
  }

  /**
   * Show Account
   *
   * Get a current user's account by account ID or currency string.
   */
  getAccount(params: { accountId: string }): Promise<{
    data: CBAppAccount;
  }> {
    return this.getPrivate(`/v2/accounts/${params.accountId}`);
  }

  /**
   *
   * Address Endpoints
   *
   */

  /**
   * Create Address
   *
   * Creates a new address for an account. Addresses can be created for wallet account types.
   */
  createAddress(params: { accountId: string; name?: string }): Promise<{
    data: CBAppAddress;
  }> {
    return this.postPrivate(`/v2/accounts/${params.accountId}/addresses`, {
      body: params,
    });
  }

  /**
   * List Addresses
   *
   * Lists addresses for an account.
   *
   * This endpoint is paginated. In case you are calling it first time, leave paginationURL empty.
   * If you are paginating, provide the paginationURL value from the previous response and you will receive the next page of addresses.
   */
  getAddresses(params: { accountId: string; paginationURL?: string }): Promise<{
    pagination: CBAppPagination;
    data: CBAppAddress[];
  }> {
    if (params?.paginationURL) {
      return this.getPrivate(params.paginationURL);
    }
    return this.getPrivate(`/v2/accounts/${params.accountId}/addresses`);
  }

  /**
   * Show Address
   *
   * Get an single address for an account.
   * A regular cryptocurrency address can be used in place of address_id but the address must be associated with the correct account.
   *
   * !! An address can only be associated with one account. See Create Address to create new addresses.
   */
  getAddress(params: { accountId: string; addressId: string }): Promise<{
    data: CBAppAddress;
  }> {
    return this.getPrivate(
      `/v2/accounts/${params.accountId}/addresses/${params.addressId}`,
    );
  }

  /**
   * List Address Transactions
   *
   * List transactions that have been sent to a specific address.
   * A regular cryptocurrency address can be used in place of address_id but the address must be associated with the correct account.
   *
   * This endpoint is paginated. In case you are calling it first time, leave paginationURL empty.
   * If you are paginating, provide the paginationURL value from the previous response and you will receive the next page of transactions.
   */
  getAddressTransactions(params: {
    accountId: string;
    addressId: string;
    paginationURL?: string;
  }): Promise<{
    pagination: CBAppPagination;
    data: CBAppTransaction[];
  }> {
    if (params?.paginationURL) {
      return this.getPrivate(params.paginationURL);
    }
    return this.getPrivate(
      `/v2/accounts/${params.accountId}/addresses/${params.addressId}/transactions`,
    );
  }

  /**
   *
   * Transactions Endpoints
   *
   */

  /**
   * Send Money
   *
   * Send funds to a network address for any Coinbase supported asset, or email address of the recipient.
   * No transaction fees are required for off-blockchain cryptocurrency transactions.
   */
  sendMoney(
    params: CBAppSendMoneyRequest,
  ): Promise<{ data: CBAppTransaction }> {
    const { accountId, ...restParams } = params;
    return this.postPrivate(`/v2/accounts/${accountId}/transactions`, {
      body: restParams,
    });
  }

  /**
   * Transfer Money
   *
   * Transfer any Coinbase supported digital asset between two of a single user's accounts.
   * Accounts must support the same currency for transfers to be successful.
   */
  transferMoney(
    params: CBAppTransferMoneyRequest,
  ): Promise<{ data: CBAppTransaction }> {
    const { accountId, ...restParams } = params;
    return this.postPrivate(`/v2/accounts/${accountId}/transactions`, {
      body: restParams,
    });
  }

  /**
   * List Transactions
   *
   * Lists the transactions of an account by account ID.
   *
   * This endpoint is paginated. In case you are calling it first time, leave paginationURL empty.
   * If you are paginating, provide the paginationURL value from the previous response and you will receive the next page of transactions.
   */
  getTransactions(params: {
    accountId: string;
    paginationURL?: string;
  }): Promise<{
    pagination: CBAppPagination;
    data: CBAppTransaction[];
  }> {
    if (params?.paginationURL) {
      return this.getPrivate(params.paginationURL);
    }
    return this.getPrivate(`/v2/accounts/${params.accountId}/transactions`);
  }

  /**
   * Show Transaction
   *
   * Get a single transaction for an account.
   */
  getTransaction(params: {
    accountId: string;
    transactionId: string;
  }): Promise<{
    data: CBAppTransaction;
  }> {
    return this.getPrivate(
      `/v2/accounts/${params.accountId}/transactions/${params.transactionId}`,
    );
  }

  /**
   *
   * Deposits Endpoints
   *
   */

  /**
   * Deposit Funds
   *
   * Deposits user-defined amount of funds to a fiat account.
   */
  depositFunds(
    params: CBAppDepositFundsRequest,
  ): Promise<{ data: CBAppDepositWithdrawal }> {
    const { accountId, ...restParams } = params;
    return this.postPrivate(`/v2/accounts/${accountId}/deposits`, {
      body: restParams,
    });
  }

  /**
   * Commit Deposit
   *
   * Completes a deposit that is created in commit: false state.
   */
  commitDeposit(params: {
    accountId: string;
    depositId: string;
  }): Promise<{ data: CBAppDepositWithdrawal }> {
    return this.postPrivate(
      `/v2/accounts/${params.accountId}/deposits/${params.depositId}/commit`,
    );
  }

  /**
   * List Deposits
   *
   * Lists fiat deposits for an account.
   *
   * This endpoint is paginated. In case you are calling it first time, leave paginationURL empty.
   * If you are paginating, provide the paginationURL value from the previous response and you will receive the next page of deposits.
   */
  getDeposits(params: { accountId: string; paginationURL?: string }): Promise<{
    pagination: CBAppPagination;
    data: CBAppDepositWithdrawal[];
  }> {
    if (params?.paginationURL) {
      return this.getPrivate(params.paginationURL);
    }
    return this.getPrivate(`/v2/accounts/${params.accountId}/deposits`);
  }

  /**
   * Show Deposit
   *
   * Get one deposit by deposit Id.
   */
  getDeposit(params: { accountId: string; depositId: string }): Promise<{
    data: CBAppDepositWithdrawal;
  }> {
    return this.getPrivate(
      `/v2/accounts/${params.accountId}/deposits/${params.depositId}`,
    );
  }

  /**
   *
   * Withdrawals Endpoints
   *
   */

  /**
   * Withdraw Funds
   *
   * Withdraws a user-defined amount of funds from a fiat account.
   */
  withdrawFunds(
    params: CBAppWithdrawFundsRequest,
  ): Promise<{ data: CBAppDepositWithdrawal }> {
    const { accountId, ...restParams } = params;
    return this.postPrivate(`/v2/accounts/${accountId}/withdrawals`, {
      body: restParams,
    });
  }

  /**
   * Commit Withdrawal
   *
   * Completes a withdrawal that is created in commit: false state.
   */
  commitWithdrawal(params: {
    accountId: string;
    withdrawalId: string;
  }): Promise<{ data: CBAppDepositWithdrawal }> {
    return this.postPrivate(
      `/v2/accounts/${params.accountId}/withdrawals/${params.withdrawalId}/commit`,
    );
  }

  /**
   * List Withdrawals
   *
   * Lists withdrawals for an account.
   *
   * This endpoint is paginated. In case you are calling it first time, leave paginationURL empty.
   * If you are paginating, provide the paginationURL value from the previous response and you will receive the next page of withdrawals.
   */
  getWithdrawals(params: {
    accountId: string;
    paginationURL?: string;
  }): Promise<{
    pagination: CBAppPagination;
    data: CBAppDepositWithdrawal[];
  }> {
    if (params?.paginationURL) {
      return this.getPrivate(params.paginationURL);
    }
    return this.getPrivate(`/v2/accounts/${params.accountId}/withdrawals`);
  }

  /**
   * Show Withdrawal
   *
   * Get a single withdrawal.
   */
  getWithdrawal(params: { accountId: string; withdrawalId: string }): Promise<{
    data: CBAppDepositWithdrawal;
  }> {
    return this.getPrivate(
      `/v2/accounts/${params.accountId}/withdrawals/${params.withdrawalId}`,
    );
  }

  /**
   *
   * DATA - Currencies Endpoints
   *
   */

  /**
   * Get Fiat Currencies
   *
   * Lists known fiat currencies. Currency codes conform to the ISO 4217 standard where possible.
   * Currencies with no representation in ISO 4217 may use a custom code.
   */
  getFiatCurrencies(): Promise<{
    data: CBAppFiatCurrency[];
  }> {
    return this.get('/v2/currencies');
  }

  /**
   * Get Cryptocurrencies
   *
   * Lists known cryptocurrencies.
   */
  getCryptocurrencies(): Promise<CBAppCryptocurrency[]> {
    return this.get('/v2/currencies/crypto');
  }

  /**
   *
   * DATA- Exchange rates Endpoints
   *
   */

  /**
   * Get Exchange Rates
   *
   * Get current exchange rates. Default base currency is USD but it can be defined as any supported currency.
   * Returned rates will define the exchange rate for one unit of the base currency.
   */
  getExchangeRates(params?: { currency?: string }): Promise<{
    data: {
      currency: string;
      rates: { [key: string]: string };
    };
  }> {
    return this.get(`/v2/exchange-rates`, params);
  }

  /**
   *
   * DATA - Prices Endpoints
   *
   */

  /**
   * Get Buy Price
   *
   * Get the total price to buy one bitcoin or ether.
   * This endpoint doesn't require authentication.
   */
  getBuyPrice(params: { currencyPair: string }): Promise<{
    data: {
      amount: string;
      currency: string;
    };
  }> {
    return this.get(`/v2/prices/${params.currencyPair}/buy`);
  }

  /**
   * Get Sell Price
   *
   * Get the total price to sell one bitcoin or ether.
   * This endpoint doesn't require authentication.
   */
  getSellPrice(params: { currencyPair: string }): Promise<{
    data: {
      amount: string;
      currency: string;
    };
  }> {
    return this.get(`/v2/prices/${params.currencyPair}/sell`);
  }

  /**
   * Get Spot Price
   *
   * Get the current market price for bitcoin. This is usually somewhere in between the buy and sell price.
   * This endpoint doesn't require authentication.
   */
  getSpotPrice(params: { currencyPair: string; date?: string }): Promise<{
    data: {
      amount: string;
      currency: string;
    };
  }> {
    const { currencyPair, ...query } = params;
    return this.get(`/v2/prices/${currencyPair}/spot`, query);
  }

  /**
   *
   * DATA - Time Endpoints
   *
   */

  /**
   * Get Current Time
   *
   * Get the API server time.
   * This endpoint doesn't require authentication.
   */
  getCurrentTime(): Promise<{
    data: {
      iso: string;
      epoch: number;
    };
  }> {
    return this.get('/v2/time');
  }
}
