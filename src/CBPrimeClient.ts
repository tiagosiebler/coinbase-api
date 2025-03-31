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
  GetPrimeEntityAccrualsRequest,
  GetPrimeEntityActivitiesRequest,
  GetPrimeEntityLocateAvailabilitiesRequest,
  GetPrimeEntityMarginSummariesRequest,
  GetPrimeEntityTFTieredFeesRequest,
  GetPrimeInvoicesRequest,
  GetPrimeOpenOrdersRequest,
  GetPrimeOrderFillsRequest,
  GetPrimeOrderPreviewRequest,
  GetPrimePortfolioAccrualsRequest,
  GetPrimePortfolioAllocationsRequest,
  GetPrimePortfolioBuyingPowerRequest,
  GetPrimePortfolioFillsRequest,
  GetPrimePortfolioLocatesRequest,
  GetPrimePortfolioMarginConversionsRequest,
  GetPrimePortfolioOrdersRequest,
  GetPrimePortfolioProductsRequest,
  GetPrimePortfolioTransactionsRequest,
  GetPrimePortfolioUsersRequest,
  GetPrimePortfolioWalletsRequest,
  GetPrimePortfolioWithdrawalPowerRequest,
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
   * Retrieve an activity by its activity ID - this endpoint can retrieve both portfolio and entity activities when passed the appropriate API key.
   */
  getActivityById(params: { activity_id: string }): Promise<any> {
    const { activity_id } = params;
    return this.getPrivate(`/v1/activities/${activity_id}`);
  }

  /**
   * List Entity Activities
   *
   * List all activities associated with a given entity.
   */
  getEntityActivities(params: GetPrimeEntityActivitiesRequest): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/activities`, query);
  }

  /**
   * Get Portfolio Activity by Activity ID
   *
   * Retrieve an activity by its activity ID for a specific portfolio.
   */
  getPortfolioActivityById(params: {
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
   * Financing Endpoints
   *
   */

  /**
   * List Interest Accruals
   *
   * Lists interest accruals for an entity between the specified date range given.
   */
  getEntityAccruals(params: GetPrimeEntityAccrualsRequest): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/accruals`, query);
  }

  /**
   * Get Entity Locate Availabilities
   *
   * Get currencies available to be located with their corresponding amount and rate.
   */
  getEntityLocateAvailabilities(
    params: GetPrimeEntityLocateAvailabilitiesRequest,
  ): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(
      `/v1/entities/${entity_id}/locates_availability`,
      query,
    );
  }

  /**
   * Get Margin Information
   *
   * Gets real-time evaluation of the margin model based on current positions and spot rates.
   */
  getEntityMargin(params: { entity_id: string }): Promise<any> {
    const { entity_id } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/margin`);
  }

  /**
   * List Margin Call Summaries
   *
   * Lists the margin call history for a given entity ID.
   */
  getEntityMarginSummaries(
    params: GetPrimeEntityMarginSummariesRequest,
  ): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/margin_summaries`, query);
  }

  /**
   * Get Trade Finance Tiered Pricing Fees
   *
   * Get trade finance tiered pricing fees for a given entity at a specific time, default to current time.
   */
  getEntityTFTieredFees(
    params: GetPrimeEntityTFTieredFeesRequest,
  ): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/tf_tiered_fees`, query);
  }

  /**
   * List Interest Accruals For Portfolio
   *
   * Lists interest accruals between the specified date range for a specific portfolio ID.
   */
  getPortfolioAccruals(params: GetPrimePortfolioAccrualsRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/accruals`, query);
  }

  /**
   * Get Portfolio Buying Power
   *
   * Returns the size of a buy trade that can be performed based on existing holdings and available credit.
   */
  getPortfolioBuyingPower(
    params: GetPrimePortfolioBuyingPowerRequest,
  ): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/buying_power`,
      query,
    );
  }

  /**
   * List Existing Locates
   *
   * List locates for the portfolio.
   */
  getPortfolioLocates(params: GetPrimePortfolioLocatesRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/locates`, query);
  }

  /**
   * List Margin Conversions
   *
   * Lists conversions and short collateral requirement between specified date range.
   * This endpoint is deprecated and will be removed in the future. Use /v1/entities/{entity_id}/margin_summaries instead.
   */
  getPortfolioMarginConversions(
    params: GetPrimePortfolioMarginConversionsRequest,
  ): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/margin_conversions`,
      query,
    );
  }

  /**
   * Get Portfolio Withdrawal Power
   *
   * Returns the nominal quantity of a given asset that can be withdrawn based on holdings and current portfolio equity.
   */
  getPortfolioWithdrawalPower(
    params: GetPrimePortfolioWithdrawalPowerRequest,
  ): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(
      `/v1/portfolios/${portfolio_id}/withdrawal_power`,
      query,
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
   * Position Endpoints
   *
   */

  /**
   * List Aggregate Entity Positions
   *
   * List paginated aggregate positions for a specific entity.
   */
  getEntityAggregatePositions(params: {
    entity_id: string;
    cursor?: string;
    limit?: number;
  }): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(
      `/v1/entities/${entity_id}/aggregate_positions`,
      query,
    );
  }

  /**
   * List Entity Positions
   *
   * List paginated positions for a specific entity.
   */
  getEntityPositions(params: {
    entity_id: string;
    cursor?: string;
    limit?: number;
  }): Promise<any> {
    const { entity_id, ...query } = params;
    return this.getPrivate(`/v1/entities/${entity_id}/positions`, query);
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
   * List Portfolio Fills
   *
   * Retrieve fills on a given portfolio.
   *
   * Note: This endpoint requires a start_date and returns a payload with a default
   * limit of 100 if not specified. The maximum allowed limit is 3000.
   */
  getPortfolioFills(params: GetPrimePortfolioFillsRequest): Promise<any> {
    const { portfolio_id, ...query } = params;
    return this.getPrivate(`/v1/portfolios/${portfolio_id}/fills`, query);
  }

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
    this.validateOrderId(params, 'client_order_id');
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
