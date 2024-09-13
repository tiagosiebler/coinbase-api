import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  CreatePrimeAddressBookEntryRequest,
  CreatePrimeConversionRequest,
  CreatePrimePortfolioAllocationsRequest,
  CreatePrimePortfolioNetAllocationsRequest,
  CreatePrimeTransferRequest,
  CreatePrimeWalletRequest,
  CreatePrimeWithdrawalRequest,
  GetPrimeActivitiesRequest,
  GetPrimeAddressBookRequest,
  GetPrimeInvoicesRequest,
  GetPrimeOpenOrdersRequest,
  GetPrimeOrderFillsRequest,
  GetPrimeOrderPreviewRequest,
  GetPrimePortfolioAllocationsRequest,
  GetPrimePortfolioOrdersRequest,
  GetPrimePortfolioProductsRequest,
  GetPrimePortfolioTransactionsRequest,
  GetPrimePortfolioUsersRequest,
  GetPrimePortfolioWalletsRequest,
  GetPrimeUsersRequest,
  GetPrimeWalletDepositInstructionsRequest,
  GetPrimeWalletTransactionsRequest,
  GetPrimeWeb3WalletBalancesRequest,
  SubmitPrimeOrderRequest,
} from './types/request/coinbase-prime.js';

/**
 * REST client for Coinbase Prime API:
 * https://docs.cdp.coinbase.com/prime/docs/welcome
 */
export class CBPrimeClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.prime;
  }

  /**
   *
   * Allocation Endpoints
   *
   */

  /**
   * Create Portfolio Allocations
   *
   * Create allocation for a given portfolio.
   */
  createPortfolioAllocations(
    params: CreatePrimePortfolioAllocationsRequest,
  ): Promise<any> {
    return this.postPrivate('/v1/allocations', { body: params });
  }

  /**
   * Create Portfolio Net Allocations
   *
   * Create net allocation for a given portfolio.
   */
  createPortfolioNetAllocations(
    params: CreatePrimePortfolioNetAllocationsRequest,
  ): Promise<any> {
    return this.postPrivate('/v1/allocations/net', { body: params });
  }

  /**
   * List Portfolio Allocations
   *
   * Retrieve historical allocations for a given portfolio.
   */
  getPortfolioAllocations(
    params: GetPrimePortfolioAllocationsRequest,
  ): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/allocations`, query);
  }

  /**
   * Get Allocation By ID
   *
   * Retrieve an allocation by allocation ID.
   */
  getAllocationById(params: {
    portfolio_id: string;
    allocation_id: string;
  }): Promise<any> {
    const { portfolio_id, allocation_id } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/allocations/${allocation_id}`,
    );
  }

  /**
   * Get Net Allocations By Netting ID
   *
   * Retrieve an allocation by netting ID.
   */
  getNetAllocationsByNettingId(params: {
    portfolio_id: string;
    netting_id: string;
  }): Promise<any> {
    const { portfolio_id, netting_id } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/allocations/net/${netting_id}`,
    );
  }

  /**
   *
   * Invoice Endpoints
   *
   */

  /**
   * List Invoices
   *
   * Retrieve a list of invoices belonging to an entity.
   */
  getInvoices(params: GetPrimeInvoicesRequest): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/invoices`, query);
  }

  /**
   *
   * Assets Endpoints
   *
   */

  /**
   * List Assets
   *
   * List all assets available for a given entity.
   */
  getAssets(params: { entity_id: string }): Promise<any> {
    return this.getPrivate(`/v1/entities/${params.entity_id}/assets`);
  }

  /**
   *
   * Payment Methods Endpoints
   *
   */

  /**
   * List Entity Payment Methods
   *
   * Retrieve all payment methods for a given entity.
   */
  getEntityPaymentMethods(params: { entity_id: string }): Promise<any> {
    return this.getPrivate(`/v1/entities/${params.entity_id}/payment-methods`);
  }

  /**
   * Get Entity Payment Method
   *
   * Get payment method details by id for a given entity.
   */
  getEntityPaymentMethod(params: {
    entity_id: string;
    payment_method_id: string;
  }): Promise<any> {
    const { entity_id, payment_method_id } = params;
    return this.getPrivate(
      `/v1/entities/${entity_id}/payment-methods/${payment_method_id}`,
    );
  }

  /**
   *
   * Users Endpoints
   *
   */

  /**
   * List Users
   *
   * List all users associated with a given entity.
   */
  getUsers(params: GetPrimeUsersRequest): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/users`, query);
  }

  /**
   * List Portfolio Users
   *
   * List all users associated with a given portfolio.
   */
  getPortfolioUsers(params: GetPrimePortfolioUsersRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/users`, query);
  }

  /**
   *
   * Portfolios Endpoints
   *
   */

  /**
   * List Portfolios
   *
   * List all portfolios for which the current API key has read access.
   */
  getPortfolios(): Promise<any> {
    return this.getPrivate('/v1/portfolios');
  }

  /**
   * Get Portfolio by Portfolio ID
   *
   * Retrieve a given portfolio by its portfolio ID.
   */
  getPortfolioById(params: { portfolio_id: string }): Promise<any> {
    return this.getPrivate(`/v1/portfolios/${params.portfolio_id}`);
  }

  /**
   * Get Portfolio Credit Information
   *
   * Retrieve a portfolio's post-trade credit information.
   */
  getPortfolioCreditInformation(params: {
    portfolio_id: string;
  }): Promise<any> {
    return this.getPrivate(`/v1/portfolios/${params.portfolio_id}/credit`);
  }

  /**
   *
   * Activities Endpoints
   *
   */

  /**
   * List Activities
   *
   * List all activities associated with a given entity.
   */
  getActivities(params: GetPrimeActivitiesRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/activities`, query);
  }

  /**
   * Get Activity by Activity ID
   *
   * Retrieve an activity by its activity ID.
   */
  getActivityById(params: {
    portfolio_id: string;
    activity_id: string;
  }): Promise<any> {
    const { portfolio_id, activity_id } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/activities/${activity_id}`,
    );
  }

  /**
   *
   * Address Book Endpoints
   *
   */

  /**
   * Get Address Book
   *
   * Gets a list of address book addresses.
   */
  getAddressBook(params: GetPrimeAddressBookRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/address_book`,
      query,
    );
  }

  /**
   * Create Address Book Entry
   *
   * Creates an entry for a portfolio's trusted addresses.
   */
  createAddressBookEntry(
    params: CreatePrimeAddressBookEntryRequest,
  ): Promise<any> {
    const { portfolio_id, ...body } = params;
    return this.postPrivate(`/v1/portfolios/${portfolio_id}/address_book`, {
      body: body,
    });
  }

  /**
   *
   * Balances Endpoints
   *
   */

  /**
   * List Portfolio Balances
   *
   * List all balances for a specific portfolio.
   */
  getPortfolioBalances(params: {
    portfolio_id: string;
    symbols?: string[];
    balance_type?: 'TRADING_BALANCES' | 'VAULT_BALANCES' | 'TOTAL_BALANCES';
  }): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/balances`, query);
  }

  /**
   * Get Wallet Balance
   *
   * Query balance for a specific wallet.
   */
  getWalletBalance(params: {
    portfolio_id: string;
    wallet_id: string;
  }): Promise<any> {
    const { portfolio_id, wallet_id } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}/balance`,
    );
  }

  /**
   * List Web3 Wallet Balances
   *
   * Query balances for a specific web3 wallet.
   */
  getWeb3WalletBalances(
    params: GetPrimeWeb3WalletBalancesRequest,
  ): Promise<any> {
    const { portfolio_id, wallet_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}/web3_balances`,
      query,
    );
  }

  /**
   *
   * Commission Endpoints
   *
   */

  /**
   * Get Portfolio Commission
   *
   * Retrieve commission associated with a given portfolio.
   */
  getPortfolioCommission(params: { portfolio_id: string }): Promise<any> {
    return this.getPrivate(`/v1/portfolios/${params.portfolio_id}/commission`);
  }

  /**
   *
   * Orders Endpoints
   *
   */

  /**
   * List Open Orders
   *
   * List all open orders for a given portfolio.
   */
  getOpenOrders(params: GetPrimeOpenOrdersRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/open_orders`, query);
  }

  /**
   * Create Order
   *
   * Create an order for a given portfolio.
   */
  submitOrder(params: SubmitPrimeOrderRequest): Promise<any> {
    const { portfolio_id, ...body } = params;
    return this.postPrivate(`/v1/portfolios/${portfolio_id}/order`, {
      body: body,
    });
  }

  /**
   * Get Order Preview
   *
   * Retrieve an order preview for a given portfolio.
   */
  getOrderPreview(params: GetPrimeOrderPreviewRequest): Promise<any> {
    const { portfolio_id, ...body } = params;
    return this.postPrivate(`/v1/portfolios/${portfolio_id}/order_preview`, {
      body: body,
    });
  }

  /**
   * List Portfolio Orders
   *
   * List historical orders for a given portfolio.
   */
  getPortfolioOrders(params: GetPrimePortfolioOrdersRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/orders`, query);
  }

  /**
   * Get Order by Order ID
   *
   * Retrieve an order by order ID.
   */
  getOrderById(params: {
    portfolio_id: string;
    order_id: string;
  }): Promise<any> {
    const { portfolio_id, order_id } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/orders/${order_id}`);
  }

  /**
   * Cancel Order
   *
   * Cancel an order. (Filled orders cannot be canceled.)
   */
  cancelOrder(params: {
    portfolio_id: string;
    order_id: string;
  }): Promise<any> {
    const { portfolio_id, order_id } = params;
    return this.postPrivate(
      `/v1/portfolios/${portfolio_id}/orders/${order_id}/cancel`,
    );
  }

  /**
   * List Order Fills
   *
   * Retrieve fills on a given order.
   */
  getOrderFills(params: GetPrimeOrderFillsRequest): Promise<any> {
    const { portfolio_id, order_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/orders/${order_id}/fills`,
      query,
    );
  }

  /**
   *
   * Products Endpoints
   *
   */

  /**
   * List Portfolio Products
   *
   * List tradable products for a given portfolio.
   */
  getPortfolioProducts(params: GetPrimePortfolioProductsRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/products`, query);
  }

  /**
   *
   * Transactions Endpoints
   *
   */

  /**
   * List Portfolio Transactions
   *
   * List transactions for a given portfolio (only transactions that affect balances are accessible).
   */
  getPortfolioTransactions(
    params: GetPrimePortfolioTransactionsRequest,
  ): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/transactions`,
      query,
    );
  }

  /**
   * Get Transaction by Transaction ID
   *
   * Retrieve a specific transaction by its transaction ID (only transactions that affect balances are accessible).
   */
  getTransactionById(params: {
    portfolio_id: string;
    transaction_id: string;
  }): Promise<any> {
    const { portfolio_id, transaction_id } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/transactions/${transaction_id}`,
    );
  }

  /**
   * Create Conversion
   *
   * Perform a conversion between 2 assets.
   */
  createConversion(params: CreatePrimeConversionRequest): Promise<any> {
    const { portfolio_id, wallet_id, ...body } = params;
    return this.postPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}/conversion`,
      { body: body },
    );
  }

  /**
   * List Wallet Transactions
   *
   * Retrieve transactions for a given wallet (only transactions that affect balances are accessible).
   */
  getWalletTransactions(
    params: GetPrimeWalletTransactionsRequest,
  ): Promise<any> {
    const { portfolio_id, wallet_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}/transactions`,
      query,
    );
  }

  /**
   * Create Transfer
   *
   * Create a wallet transfer.
   */
  createTransfer(params: CreatePrimeTransferRequest): Promise<any> {
    const { portfolio_id, wallet_id, ...body } = params;
    return this.postPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}/transfers`,
      { body: body },
    );
  }

  /**
   * Create Withdrawal
   *
   * Create a withdrawal.
   */
  createWithdrawal(params: CreatePrimeWithdrawalRequest): Promise<any> {
    const { portfolio_id, wallet_id, ...body } = params;
    return this.postPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}/withdrawals`,
      { body: body },
    );
  }

  /**
   *
   * Wallets Endpoints
   *
   */

  /**
   * List Portfolio Wallets
   *
   * List all wallets associated with a given portfolio.
   */
  getPortfolioWallets(params: GetPrimePortfolioWalletsRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/wallets`, query);
  }

  /**
   * Create Wallet
   *
   * Create a wallet.
   */
  createWallet(params: CreatePrimeWalletRequest): Promise<any> {
    const { portfolio_id, ...body } = params;
    return this.postPrivate(`/v1/portfolios/${portfolio_id}/wallets`, {
      body: body,
    });
  }

  /**
   * Get Wallet by Wallet ID
   *
   * Retrieve a specific wallet by Wallet ID.
   */
  getWalletById(params: {
    portfolio_id: string;
    wallet_id: string;
  }): Promise<any> {
    const { portfolio_id, wallet_id } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}`,
    );
  }

  /**
   * Get Wallet Deposit Instructions
   *
   * Retrieve a specific wallet's deposit instructions.
   */
  getWalletDepositInstructions(
    params: GetPrimeWalletDepositInstructionsRequest,
  ): Promise<any> {
    const { portfolio_id, wallet_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/wallets/${wallet_id}/deposit_instructions`,
      query,
    );
  }
}
