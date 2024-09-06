import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';
import {
  ListOrdersParams,
  SubmitOrderRequest,
} from 'types/request/advanced-trade-client.js';
import { OrderConfiguration } from 'types/shared.types.js';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  Account,
  AccountsList,
  BestBidAsk,
  CancelOrdersResponse,
  Candle,
  ClosePositionResponse,
  CurrentMarginWindow,
  EditOrderPreviewResponse,
  EditOrderResponse,
  Fill,
  FuturesBalance,
  FuturesPosition,
  FuturesSweep,
  MarketTrades,
  Order,
  OrderPreview,
  PaymentMethod,
  PerpetualsAsset,
  PerpetualsPortfolio,
  PerpetualsPosition,
  Portfolio,
  PortfolioBreakdown,
  Pricebook,
  Product,
  PublicProduct,
  SubmitOrderResponse,
  TransactionSummary,
} from './types/response/advanced-trade-client.js';

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
  }): Promise<AccountsList> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/accounts`, params);
  }

  /**
   * Get Account
   *
   * Get a list of information about an account, given an account UUID.
   * Tip: Use List Accounts to find account UUIDs.
   */
  getAccount(params: { account_id: string }): Promise<{
    account: Account;
  }> {
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/accounts/${params.account_id}`,
    );
  }

  /**
   *
   * Products Endpoints
   *
   */

  /**
   * Get Best Bid/Ask
   *
   * Get the best bid/ask for all products. A subset of all products can be returned instead by using the product_ids input.
   */
  getBestBidAsk(params?: { product_ids?: string[] }): Promise<BestBidAsk> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/best_bid_ask`, params);
  }

  /**
   * Get Product Book
   *
   * Get a list of bids/asks for a single product. The amount of detail shown can be customized with the limit parameter.
   */
  getProductBook(params: {
    product_id: string;
    limit?: number;
    aggregation_price_increment?: string;
  }): Promise<Pricebook> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/product_book`, params);
  }

  /**
   * List Products
   *
   * Get a list of the available currency pairs for trading.
   *
   */
  listProducts(params?: {
    limit?: number;
    offset?: number;
    product_type?: 'UNKNOWN_PRODUCT_TYPE' | 'FUTURE' | 'SPOT';
    product_ids?: string[];
    contract_expiry_type?:
      | 'UNKNOWN_CONTRACT_EXPIRY_TYPE'
      | 'PERPETUAL'
      | 'EXPIRING';
    expiring_contract_status?:
      | 'UNKNOWN_EXPIRING_CONTRACT_STATUS'
      | 'STATUS_UNEXPIRED'
      | 'STATUS_EXPIRED'
      | 'STATUS_ALL';
    get_tradability_status?: boolean;
    get_all_products?: boolean;
  }): Promise<{
    products: Product[];
    num_products: number;
  }> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/products`, params);
  }

  /**
   * Get Product
   *
   * Get information on a single product by product ID.
   */
  getProduct(params: {
    product_id: string;
    get_tradability_status?: boolean;
  }): Promise<Product> {
    const { product_id, ...queryParams } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/products/${product_id}`,
      queryParams,
    );
  }

  /**
   * Get Product Candles
   *
   * Get rates for a single product by product ID, grouped in buckets.
   */
  getProductCandles(params: {
    product_id: string;
    start: string;
    end: string;
    granularity:
      | 'UNKNOWN_GRANULARITY'
      | 'ONE_MINUTE'
      | 'FIVE_MINUTE'
      | 'FIFTEEN_MINUTE'
      | 'THIRTY_MINUTE'
      | 'ONE_HOUR'
      | 'TWO_HOUR'
      | 'SIX_HOUR'
      | 'ONE_DAY';
    limit?: number;
  }): Promise<{
    candles: Candle[];
  }> {
    const { product_id, ...queryParams } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/products/${product_id}/candles`,
      queryParams,
    );
  }

  /**
   * Get Market Trades
   *
   * Get snapshot information by product ID about the last trades (ticks) and best bid/ask.
   */
  getMarketTrades(params: {
    product_id: string;
    limit: number;
    start?: string;
    end?: string;
  }): Promise<MarketTrades> {
    const { product_id, ...queryParams } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/products/${product_id}/ticker`,
      queryParams,
    );
  }

  /**
   *
   * Orders Endpoints
   *
   */

  /**
   * Create Order
   *
   * Create an order with a specified product_id (asset-pair), side (buy/sell), etc.
   *
   */
  createOrder(params: SubmitOrderRequest): Promise<SubmitOrderResponse> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/orders`, {
      body: params,
    });
  }

  /**
   * Cancel Orders
   *
   * Initiate cancel requests for one or more orders.
   * The maximum number of order_ids that can be cancelled per request is 100.
   * This number may be subject to change in emergency, but if a request exceeds the max,
   * then an InvalidArgument error code will be returned with an error message denoting the limit.
   */
  cancelOrders(params: { order_ids: string[] }): Promise<CancelOrdersResponse> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/orders/batch_cancel`, {
      body: params,
    });
  }

  /**
   * Edit Order
   *
   * Edit an order with a specified new size, or new price.
   *
   * - Your request moves to the back of the queue if you increase the size or increase or decrease the price.
   * - If you decrease the size, you keep your place in line.
   * - A client can only send an Edit Order request after the previous request for the same order has been fully processed.
   */
  editOrder(params: {
    order_id: string;
    price?: string;
    size?: string;
  }): Promise<EditOrderResponse> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/orders/edit`, {
      body: params,
    });
  }

  /**
   * Edit Order Preview
   *
   * Preview an edit order request with a specified new size, or new price.
   *
   */
  editOrderPreview(params: {
    order_id: string;
    price?: string;
    size?: string;
  }): Promise<EditOrderPreviewResponse> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/orders/edit_preview`, {
      body: params,
    });
  }

  /**
   * List Orders
   *
   * Get a list of orders filtered by optional query parameters.
   *
   * - The maximum number of OPEN orders returned is 1000.
   * - The parameters start_date and end_date don't apply to open orders.
   * - You cannot pair open orders with other order types.
   * - You cannot query for OPEN orders with other order types.
   */
  listOrders(params?: ListOrdersParams): Promise<{
    orders: Order[];
    sequence?: number;
    has_next: boolean;
    cursor?: string;
  }> {
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/orders/historical/batch`,
      params,
    );
  }

  /**
   * List Fills
   *
   * Get a list of fills filtered by optional query parameters (product_id, order_id, etc).
   *
   */
  listFills(params?: {
    order_ids?: string[];
    trade_ids?: string[];
    product_ids?: string[];
    start_sequence_timestamp?: string;
    end_sequence_timestamp?: string;
    retail_portfolio_id?: string;
    limit?: number;
    cursor?: string;
    sort_by?: 'UNKNOWN_SORT_BY' | 'PRICE' | 'TRADE_TIME';
  }): Promise<{
    fills: Fill[];
    cursor?: string;
  }> {
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/orders/historical/fills`,
      params,
    );
  }

  /**
   * Get Order
   *
   * Get a single order by order ID.
   */
  getOrder(params: {
    order_id: string;
    client_order_id?: string;
    user_native_currency?: string;
  }): Promise<{ order: Order }> {
    const { order_id, ...queryParams } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/orders/historical/${order_id}`,
      queryParams,
    );
  }

  /**
   * Preview Order
   *
   * Preview an order.
   *
   */
  previewOrder(params: {
    product_id: string;
    side: 'BUY' | 'SELL';
    order_configuration: OrderConfiguration;
    leverage?: string;
    margin_type?: 'ISOLATED' | 'CROSS';
    retail_portfolio_id?: string;
  }): Promise<OrderPreview> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/orders/preview`, {
      body: params,
    });
  }

  /**
   * Close Position
   *
   * Places an order to close any open positions for a specified product_id.
   *
   */
  closePosition(params: {
    client_order_id: string;
    product_id: string;
    size?: string;
  }): Promise<ClosePositionResponse> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/orders/close_position`, {
      body: params,
    });
  }

  /**
   *
   * Portfolios Endpoints
   *
   */

  /**
   * List Portfolios
   *
   * Get all portfolios of a user.
   */
  listPortfolios(params?: {
    portfolio_type?: 'UNDEFINED' | 'DEFAULT' | 'CONSUMER' | 'INTX';
  }): Promise<{
    portfolios: Portfolio[];
  }> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/portfolios`, params);
  }

  /**
   * Create Portfolio
   *
   * Create a portfolio.
   */
  createPortfolio(params: { name: string }): Promise<{
    portfolio: Portfolio[];
  }> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/portfolios`, {
      body: params,
    });
  }

  /**
   * Move Portfolio Funds
   *
   * Move funds between portfolios.
   */
  movePortfolioFunds(params: {
    funds: {
      value: string;
      currency: string;
    };
    source_portfolio_uuid: string;
    target_portfolio_uuid: string;
  }): Promise<{
    source_portfolio_uuid: string;
    target_portfolio_uuid: string;
  }> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/portfolios/move_funds`, {
      body: params,
    });
  }

  /**
   * Get Portfolio Breakdown
   *
   * Get the breakdown of a portfolio.
   */
  getPortfolioBreakdown(params: {
    portfolio_uuid: string;
    currency?: string;
  }): Promise<{ breakdown: PortfolioBreakdown }> {
    const { portfolio_uuid, ...queryParams } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/portfolios/${portfolio_uuid}`,
      queryParams,
    );
  }

  /**
   * Delete Portfolio
   *
   * Delete a portfolio.
   */
  deletePortfolio(params: { portfolio_uuid: string }): Promise<any> {
    const { portfolio_uuid } = params;
    return this.deletePrivate(
      `${ADVANCED_TRADE_PREFIX}/portfolios/${portfolio_uuid}`,
    );
  }

  /**
   * Edit Portfolio
   *
   * Edit a portfolio.
   *
   */
  editPortfolio(params: {
    portfolio_uuid: string;
    name: string;
  }): Promise<{ portfolio: Portfolio }> {
    const { portfolio_uuid, ...bodyParams } = params;
    return this.putPrivate(
      `${ADVANCED_TRADE_PREFIX}/portfolios/${portfolio_uuid}`,
      {
        body: bodyParams,
      },
    );
  }

  /**
   *
   * Futures Endpoints
   *
   */

  /**
   * Get Futures Balance Summary
   *
   * Get a summary of balances for CFM trading.
   *
   * Futures vs Spot Accounts:
   * - Futures and spot balances are held in different accounts.
   * - Cash is always deposited into your Coinbase Inc. (CBI) spot account.
   * - Cash is automatically transferred to your Coinbase Financial Markets (CFM) futures account to satisfy margin requirements.
   * - You can transfer cash that isn't being used to margin or maintain futures positions into your CBI spot account.
   * - Funds held in a CBI spot account do not receive the preferential treatment given to funds held in a regulated futures account.
   *
   * Intraday vs. Overnight Margin Health:
   * - If you are opted in to receive increased leverage on futures trades during the intraday window (from 8am-4pm ET), this endpoint will return your intraday and overnight margin health.
   */
  getFuturesBalanceSummary(): Promise<{ balance_summary: FuturesBalance }> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/cfm/balance_summary`);
  }

  /**
   * Get Intraday Margin Setting
   *
   * Get the futures intraday margin setting.
   */
  getIntradayMarginSetting(): Promise<{
    setting:
      | 'INTRADAY_MARGIN_SETTING_UNSPECIFIED'
      | 'INTRADAY_MARGIN_SETTING_STANDARD'
      | 'INTRADAY_MARGIN_SETTING_INTRADAY';
  }> {
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/cfm/intraday/margin_setting`,
    );
  }

  /**
   * Set Intraday Margin Setting
   *
   * Set the futures intraday margin setting.
   */
  setIntradayMarginSetting(params?: {
    setting?:
      | 'INTRADAY_MARGIN_SETTING_UNSPECIFIED'
      | 'INTRADAY_MARGIN_SETTING_STANDARD'
      | 'INTRADAY_MARGIN_SETTING_INTRADAY';
  }): Promise<any> {
    return this.postPrivate(
      `${ADVANCED_TRADE_PREFIX}/cfm/intraday/margin_setting`,
      {
        body: params,
      },
    );
  }

  /**
   * Get Current Margin Window
   *
   * Get the futures current margin window.
   */
  getCurrentMarginWindow(params?: {
    margin_profile_type?:
      | 'MARGIN_PROFILE_TYPE_UNSPECIFIED'
      | 'MARGIN_PROFILE_TYPE_RETAIL_REGULAR'
      | 'MARGIN_PROFILE_TYPE_RETAIL_INTRADAY_MARGIN_1';
  }): Promise<{ margin_window: CurrentMarginWindow }> {
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/cfm/intraday/current_margin_window`,
      params,
    );
  }

  /**
   * List Futures Positions
   *
   * Get a list of positions in CFM products.
   */
  listFuturesPositions(): Promise<{ positions: FuturesPosition[] }> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/cfm/positions`);
  }

  /**
   * Get Futures Position
   *
   * Get positions for a specific CFM product.
   */
  getFuturesPosition(params: {
    product_id: string;
  }): Promise<{ position: FuturesPosition }> {
    const { product_id } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/cfm/positions/${product_id}`,
    );
  }

  /**
   * Schedule Futures Sweep
   *
   * Schedules a sweep of funds from FCM wallet to USD Spot wallet.
   *
   * Futures Sweep Processing:
   * - Sweep requests submitted before 5PM ET each day are processed the following business day.
   * - Sweep requests submitted after 5PM ET each day are processed in 2 business days.
   * - You can have at most one pending sweep request at a time.
   *
   * Market movements related to your open positions may impact the final amount that is transferred into your spot account.
   * The final funds transferred, up to your specified amount, depend on the available excess in your futures account.
   */
  scheduleFuturesSweep(params?: {
    usd_amount?: string;
  }): Promise<{ success: boolean }> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/cfm/sweeps/schedule`, {
      body: params,
    });
  }

  /**
   * List Futures Sweeps
   *
   * Get pending and processing sweeps of funds from FCM wallet to USD Spot wallet.
   *
   * Pending vs. Processing Sweeps:
   * - A pending sweep is a sweep that has not started processing and can be cancelled.
   * - A processing sweep is a sweep that is currently being processed and cannot be cancelled.
   * - Once a sweep is complete, it no longer appears in the list of sweeps.
   */
  listFuturesSweeps(): Promise<{ sweeps: FuturesSweep[] }> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/cfm/sweeps`);
  }

  /**
   * Cancel Pending Futures Sweep
   *
   * Cancel the pending sweep of funds from FCM wallet to USD Spot wallet.
   */
  cancelPendingFuturesSweep(): Promise<{ success: boolean }> {
    return this.deletePrivate(`${ADVANCED_TRADE_PREFIX}/cfm/sweeps`);
  }

  /**
   *
   * Perpetuals Endpoints
   *
   */

  /**
   * Allocate Portfolio
   *
   * Allocate portfolio funds to a sub-portfolio on Intx Portfolio.
   *
   */
  allocatePortfolio(params: {
    portfolio_uuid: string;
    symbol: string;
    amount: string;
    currency: string;
  }): Promise<any> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/intx/allocate`, {
      body: params,
    });
  }

  /**
   * Get Perpetuals Portfolio Summary
   *
   * Get a summary of your Perpetuals portfolio.
   */
  getPerpetualsPortfolioSummary(params: {
    portfolio_uuid: string;
  }): Promise<{ portfolios: PerpetualsPortfolio[] }> {
    const { portfolio_uuid } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/intx/portfolio/${portfolio_uuid}`,
    );
  }

  /**
   * List Perpetuals Positions
   *
   * Get a list of open positions in your Perpetuals portfolio.
   */
  listPerpetualsPositions(params: {
    portfolio_uuid: string;
  }): Promise<{ positions: PerpetualsPosition[] }> {
    const { portfolio_uuid } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/intx/positions/${portfolio_uuid}`,
    );
  }

  /**
   * Get Perpetuals Position
   *
   * Get a specific open position on Intx.
   *
   */
  getPerpetualsPosition(params: {
    portfolio_uuid: string;
    symbol: string;
  }): Promise<{ position: PerpetualsPosition }> {
    const { portfolio_uuid, symbol } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/intx/positions/${portfolio_uuid}/${symbol}`,
    );
  }

  /**
   * Get Portfolios Balances
   *
   * Get a list of asset balances on Intx for a given Portfolio.
   */
  getPortfoliosBalances(params: { portfolio_uuid: string }): Promise<{
    portfolio_uuid: string;
    balances: {
      asset: PerpetualsAsset;
    }[];
  }> {
    const { portfolio_uuid } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/intx/balances/${portfolio_uuid}`,
    );
  }

  /**
   * Opt In or Out of Multi Asset Collateral
   *
   * Enable or Disable Multi Asset Collateral for a given Portfolio.
   */
  optInOrOutMultiAssetCollateral(params?: {
    portfolio_uuid?: string;
    multi_asset_collateral_enabled?: boolean;
  }): Promise<{ multi_asset_collateral_enabled: boolean }> {
    return this.postPrivate(
      `${ADVANCED_TRADE_PREFIX}/intx/multi_asset_collateral`,
      {
        body: params,
      },
    );
  }

  /**
   *
   * Fees Endpoints
   *
   */

  /**
   * Get Transaction Summary
   *
   * Get a summary of transactions with fee tiers, total volume, and fees.
   */
  getTransactionSummary(params?: {
    product_type?: 'UNKNOWN_PRODUCT_TYPE' | 'SPOT' | 'FUTURE';
    contract_expiry_type?: 'UNKNOWN_CONTRACT_EXPIRY_TYPE' | 'SPOT' | 'FUTURE';
    product_venue?: 'UNKNOWN_VENUE_TYPE' | 'CBE' | 'FCM' | 'INTX';
  }): Promise<TransactionSummary> {
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/transaction_summary`,
      params,
    );
  }

  /**
   *
   * Converts Endpoints
   *
   */

  /**
   * Create Convert Quote
   *
   * Create a convert quote with a specified source account, target account, and amount.
   * Convert is applicable for USDC-USD and EURC-EUR conversion.
   */
  createConvertQuote(params: {
    from_account: string;
    to_account: string;
    amount: string;
    trade_incentive_metadata?: {
      user_incentive_id?: string;
      code_val?: string;
    };
  }): Promise<any> {
    return this.postPrivate(`${ADVANCED_TRADE_PREFIX}/convert/quote`, {
      body: params,
    });
  }

  /**
   * Get Convert Trade
   *
   * Gets a list of information about a convert trade with a specified trade id, source account, and target account.
   */
  getConvertTrade(params: {
    trade_id: string;
    from_account: string;
    to_account: string;
  }): Promise<any> {
    const { trade_id, ...queryParams } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/convert/trade/${trade_id}`,
      queryParams,
    );
  }

  /**
   * Commit Convert Trade
   *
   * Commits a convert trade with a specified trade id, source account, and target account.
   */
  commitConvertTrade(params: {
    trade_id: string;
    from_account: string;
    to_account: string;
  }): Promise<any> {
    const { trade_id, ...bodyParams } = params;
    return this.postPrivate(
      `${ADVANCED_TRADE_PREFIX}/convert/trade/${trade_id}`,
      {
        body: bodyParams,
      },
    );
  }

  /**
   *
   * Public Endpoints
   *
   */

  getServerTime(): Promise<{
    iso: string;
    epochSeconds: number;
    epochMillis: number;
  }> {
    return this.get(`${ADVANCED_TRADE_PREFIX}/time`);
  }

  /**
   * Get Public Product Book
   *
   * Get a list of bids/asks for a single product. The amount of detail shown can be customized with the limit parameter.
   */
  getPublicProductBook(params: {
    product_id: string;
    limit?: number;
    aggregation_price_increment?: string;
  }): Promise<Pricebook> {
    return this.get(`${ADVANCED_TRADE_PREFIX}/market/product_book`, params);
  }

  /**
   * List Public Products
   *
   * Get a list of the available currency pairs for trading.
   */
  listPublicProducts(params?: {
    limit?: number;
    offset?: number;
    product_type?: 'UNKNOWN_PRODUCT_TYPE' | 'SPOT' | 'FUTURE';
    product_ids?: string[];
    contract_expiry_type?: 'UNKNOWN_CONTRACT_EXPIRY_TYPE' | 'SPOT' | 'FUTURE';
    expiring_contract_status?:
      | 'UNKNOWN_EXPIRING_CONTRACT_STATUS'
      | 'STATUS_UNEXPIRED'
      | 'STATUS_EXPIRED'
      | 'STATUS_ALL';
    get_all_products?: boolean;
  }): Promise<{
    products: PublicProduct[];
    num_products: number;
  }> {
    return this.get(`${ADVANCED_TRADE_PREFIX}/market/products`, params);
  }

  /**
   * Get Public Product
   *
   * Get information on a single product by product ID.
   */
  getPublicProduct(params: { product_id: string }): Promise<PublicProduct> {
    const { product_id } = params;
    return this.get(`${ADVANCED_TRADE_PREFIX}/market/products/${product_id}`);
  }

  /**
   * Get Public Product Candles
   *
   * Get rates for a single product by product ID, grouped in buckets.
   */
  getPublicProductCandles(params: {
    product_id: string;
    start: string;
    end: string;
    granularity:
      | 'UNKNOWN_GRANULARITY'
      | 'ONE_MINUTE'
      | 'FIVE_MINUTE'
      | 'FIFTEEN_MINUTE'
      | 'THIRTY_MINUTE'
      | 'ONE_HOUR'
      | 'TWO_HOUR'
      | 'SIX_HOUR'
      | 'ONE_DAY';
    limit?: number;
  }): Promise<{ candles: Candle[] }> {
    const { product_id, ...queryParams } = params;
    return this.get(
      `${ADVANCED_TRADE_PREFIX}/market/products/${product_id}/candles`,
      queryParams,
    );
  }

  /**
   * Get Public Market Trades
   *
   * Get snapshot information by product ID about the last trades (ticks) and best bid/ask.
   */
  getPublicMarketTrades(params: {
    product_id: string;
    limit: number;
    start?: string;
    end?: string;
  }): Promise<MarketTrades> {
    const { product_id, ...queryParams } = params;
    return this.get(
      `${ADVANCED_TRADE_PREFIX}/market/products/${product_id}/ticker`,
      queryParams,
    );
  }

  /**
   *
   * Payment Methods Endpoints
   *
   */

  /**
   * List Payment Methods
   *
   * Get a list of payment methods for the current user.
   */
  listPaymentMethods(): Promise<{
    payment_methods: PaymentMethod[];
  }> {
    return this.getPrivate(`${ADVANCED_TRADE_PREFIX}/payment_methods`);
  }

  /**
   * Get Payment Method
   *
   * Get information about a payment method for the current user.
   */
  getPaymentMethod(params: { payment_method_id: string }): Promise<{
    payment_method: PaymentMethod;
  }> {
    const { payment_method_id } = params;
    return this.getPrivate(
      `${ADVANCED_TRADE_PREFIX}/payment_methods/${payment_method_id}`,
    );
  }

  /**
   *
   * Data API Endpoints
   *
   */
}
