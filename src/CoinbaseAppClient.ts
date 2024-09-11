import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';
import {
  DepositFundsRequest,
  SendMoneyRequest,
  TransferMoneyRequest,
  WithdrawFundsRequest,
} from 'types/request/coinbase-app-client.js';
import {
  Account,
  Address,
  DepositWithdrawal,
  Pagination,
  Transaction,
} from 'types/response/coinbase-app-client.js';

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
    return REST_CLIENT_TYPE_ENUM.coinbaseApp;
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
   * List a current user's accounts to which the authentication method has access to.
   *
   * This endpoint is paginated. In case you are calling it first time, leave paginationURL empty.
   * If you are paginating, provide the paginationURL value from the previous response and you will receive the next page of accounts.
   */
  getAccounts(params?: { paginationURL?: string }): Promise<{
    data: Account[];
    pagination: Pagination;
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
    data: Account;
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
    data: Address;
  }> {
    return this.postPrivate(
      `/v2/accounts/${params.accountId}/addresses`,
      params,
    );
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
    pagination: Pagination;
    data: Address[];
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
    data: Address;
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
    pagination: Pagination;
    data: Transaction[];
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
  sendMoney(params: SendMoneyRequest): Promise<{ data: Transaction }> {
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
  transferMoney(params: TransferMoneyRequest): Promise<{ data: Transaction }> {
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
    pagination: Pagination;
    data: Transaction[];
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
    data: Transaction;
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
    params: DepositFundsRequest,
  ): Promise<{ data: DepositWithdrawal }> {
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
  }): Promise<{ data: DepositWithdrawal }> {
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
    pagination: Pagination;
    data: DepositWithdrawal[];
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
    data: DepositWithdrawal;
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
    params: WithdrawFundsRequest,
  ): Promise<{ data: DepositWithdrawal }> {
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
  }): Promise<{ data: DepositWithdrawal }> {
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
    pagination: Pagination;
    data: DepositWithdrawal[];
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
    data: DepositWithdrawal;
  }> {
    return this.getPrivate(
      `/v2/accounts/${params.accountId}/withdrawals/${params.withdrawalId}`,
    );
  }
}
