import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  CancelINTXOrdersRequest,
  GetINTXAggregatedCandlesData,
  GetINTXDailyTradingVolumes,
  GetINTXFillsByPortfoliosRequest,
  GetINTXIndexCandlesRequest,
  GetINTXIndexCompositionHistory,
  GetINTXMatchingTransfersRequest,
  GetINTXOpenOrdersRequest,
  GetINTXPortfolioFillsRequest,
  INTXWithdrawToCounterpartyIdRequest,
  INTXWithdrawToCryptoAddressRequest,
  SubmitINTXOrderRequest,
  TransferINTXFundsBetweenPortfoliosRequest,
  TransferINTXPositionsBetweenPortfoliosRequest,
  UpdateINTXOpenOrderRequest,
  UpdateINTXPortfolioParametersRequest,
} from './types/request/coinbase-international.js';

/**
 * REST client for Coinbase's Institutional International Exchange API:
 * https://docs.cdp.coinbase.com/intx/docs/welcome
 */
export class CBInternationalClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.international;
  }

  /**
   *
   * Assets Endpoints
   *
   */

  /**
   * List assets
   *
   * Returns a list of all supported assets.
   */
  getAssets(): Promise<any> {
    return this.get('/api/v1/assets');
  }

  /**
   * Get asset details
   *
   * Retrieves information for a specific asset.
   */
  getAssetDetails(params: { asset: string }): Promise<any> {
    return this.get(`/api/v1/assets/${params.asset}`);
  }

  /**
   * Get supported networks per asset
   *
   * Returns a list of supported networks and network information for a specific asset.
   */
  getSupportedNetworksPerAsset(params: { asset: string }): Promise<any> {
    return this.get(`/api/v1/assets/${params.asset}/networks`);
  }

  /**
   *
   * Index Endpoints
   *
   */

  /**
   * Get index composition
   *
   * Retrieves the latest index composition (metadata) with an ordered set of constituents.
   */
  getIndexComposition(params: { index: string }): Promise<any> {
    return this.get(`/api/v1/index/${params.index}/composition`);
  }

  /**
   * Get index composition history
   *
   * Retrieves a history of index composition records in a descending time order.
   * The results are an array of index composition data recorded at different "timestamps".
   */
  getIndexCompositionHistory(
    params: GetINTXIndexCompositionHistory,
  ): Promise<any> {
    const { index, ...query } = params;
    return this.get(`/api/v1/index/${index}/composition-history`, query);
  }

  /**
   * Get index price
   *
   * Retrieves the latest index price.
   */
  getIndexPrice(params: { index: string }): Promise<any> {
    return this.get(`/api/v1/index/${params.index}/price`);
  }

  /**
   * Get index candles
   *
   * Retrieves the historical daily index prices in time descending order.
   * The daily values are represented as aggregated entries for the day in typical OHLC format.
   */
  getIndexCandles(params: GetINTXIndexCandlesRequest): Promise<any> {
    const { index, ...query } = params;
    return this.get(`/api/v1/index/${index}/candles`, query);
  }

  /**
   *
   * Instruments Endpoints
   *
   */

  /**
   * List instruments
   *
   * Returns all of the instruments available for trading.
   */
  getInstruments(): Promise<any> {
    return this.get('/api/v1/instruments');
  }

  /**
   * Get instrument details
   *
   * Retrieves market information for a specific instrument.
   */
  getInstrumentDetails(params: { instrument: string }): Promise<any> {
    return this.get(`/api/v1/instruments/${params.instrument}`);
  }

  /**
   * Get quote per instrument
   *
   * Retrieves the current quote for a specific instrument.
   */
  getQuotePerInstrument(params: { instrument: string }): Promise<any> {
    return this.get(`/api/v1/instruments/${params.instrument}/quote`);
  }

  /**
   * Get daily trading volumes
   *
   * Retrieves the trading volumes for each instrument separated by day.
   */
  getDailyTradingVolumes(params: GetINTXDailyTradingVolumes): Promise<any> {
    return this.get('/api/v1/instruments/volumes/daily', params);
  }

  /**
   * Get aggregated candles data per instrument
   *
   * Retrieves a list of aggregated candles data for a given instrument, granularity, and time range.
   */
  getAggregatedCandlesData(params: GetINTXAggregatedCandlesData): Promise<any> {
    const { instrument, ...query } = params;
    return this.get(`/api/v1/instruments/${instrument}/candles`, query);
  }

  /**
   * Get historical funding rates
   *
   * Retrieves the historical funding rates for a specific instrument.
   */
  getHistoricalFundingRates(params: {
    instrument: string;
    result_limit?: number;
    result_offset?: number;
  }): Promise<any> {
    const { instrument, ...query } = params;
    return this.get(`/api/v1/instruments/${instrument}/funding`, query);
  }

  /**
   *
   * Position Offsets Endpoints
   *
   */

  /**
   * List position offsets
   *
   * Returns all active position offsets.
   */
  getPositionOffsets(): Promise<any> {
    return this.get('/api/v1/position-offsets');
  }

  /**
   *
   * Orders Endpoints
   *
   */

  /**
   * Create order
   *
   * Creates a new order.
   */
  submitOrder(params: SubmitINTXOrderRequest): Promise<any> {
    this.validateOrderId(params, 'client_order_id');
    return this.postPrivate('/api/v1/orders', { body: params });
  }

  /**
   * List open orders
   *
   * Returns a list of active orders resting on the order book matching the requested criteria.
   * Does not return any rejected, cancelled, or fully filled orders as they are not active.
   */
  getOpenOrders(params?: GetINTXOpenOrdersRequest): Promise<any> {
    return this.getPrivate('/api/v1/orders', params);
  }

  /**
   * Cancel orders
   *
   * Cancels all orders matching the requested criteria.
   */
  cancelOrders(params: CancelINTXOrdersRequest): Promise<any> {
    return this.deletePrivate('/api/v1/orders', { query: params });
  }

  /**
   * Modify open order
   *
   * Modifies an open order.
   */
  updateOpenOrder(params: UpdateINTXOpenOrderRequest): Promise<any> {
    const { id, ...body } = params;
    return this.putPrivate(`/api/v1/orders/${id}`, { body: body });
  }

  /**
   * Get order details
   *
   * Retrieves a single order. The order retrieved can be either active or inactive.
   */
  getOrderDetails(params: { id: string; portfolio: string }): Promise<any> {
    const { id, ...query } = params;
    return this.getPrivate(`/api/v1/orders/${id}`, query);
  }

  /**
   * Cancel order
   *
   * Cancels a single open order.
   */
  cancelOrder(params: { id: string; portfolio: string }): Promise<any> {
    const { id, ...query } = params;
    return this.deletePrivate(`/api/v1/orders/${id}`, {
      query: query,
    });
  }

  /**
   *
   * Portfolios Endpoints
   *
   */

  /**
   * List all user portfolios
   *
   * Returns all of the user's portfolios.
   */
  getUserPortfolios(): Promise<any> {
    return this.getPrivate('/api/v1/portfolios');
  }

  /**
   * Create portfolio
   *
   * Create a new portfolio. Request will fail if no name is provided or if user already has max number of portfolios. Max number of portfolios is 20.
   */
  createPortfolio(params: { name: string }): Promise<any> {
    return this.postPrivate('/api/v1/portfolios', { body: params });
  }

  /**
   * Patch portfolio
   *
   * Update parameters for existing portfolio.
   */
  updatePortfolioParameters(
    params: UpdateINTXPortfolioParametersRequest,
  ): Promise<any> {
    return this.patchPrivate('/api/v1/portfolios', { body: params });
  }

  /**
   * Get user portfolio
   *
   * Returns the user's specified portfolio.
   */
  getUserPortfolio(params: { portfolio: string }): Promise<any> {
    return this.getPrivate(`/api/v1/portfolios/${params.portfolio}`);
  }

  /**
   * Update portfolio
   *
   * Update existing user portfolio.
   */
  updatePortfolio(params: { portfolio: string; name: string }): Promise<any> {
    const { portfolio, ...body } = params;
    return this.putPrivate(`/api/v1/portfolios/${portfolio}`, { body: body });
  }

  /**
   * Get portfolio details
   *
   * Retrieves the summary, positions, and balances of a portfolio.
   */
  getPortfolioDetails(params: { portfolio: string }): Promise<any> {
    return this.getPrivate(`/api/v1/portfolios/${params.portfolio}/detail`);
  }

  /**
   * Get portfolio summary
   *
   * Retrieves the high level overview of a portfolio.
   */
  getPortfolioSummary(params: { portfolio: string }): Promise<any> {
    return this.getPrivate(`/api/v1/portfolios/${params.portfolio}/summary`);
  }

  /**
   * List portfolio balances
   *
   * Returns all of the balances for a given portfolio.
   */
  getPortfolioBalances(params: { portfolio: string }): Promise<any> {
    return this.getPrivate(`/api/v1/portfolios/${params.portfolio}/balances`);
  }

  /**
   * Get balance for portfolio/asset
   *
   * Retrieves the balance for a given portfolio and asset.
   */
  getBalanceForPortfolioAsset(params: {
    portfolio: string;
    asset: string;
  }): Promise<any> {
    return this.getPrivate(
      `/api/v1/portfolios/${params.portfolio}/balances/${params.asset}`,
    );
  }

  /**
   * List active loans for the portfolio
   *
   * Retrieves all loan info for a given portfolio.
   */
  getActiveLoansForPortfolio(params: { portfolio: string }): Promise<any> {
    return this.getPrivate(`/api/v1/portfolios/${params.portfolio}/loans`);
  }

  /**
   * Get loan info for portfolio/asset
   *
   * Retrieves the loan info for a given portfolio and asset.
   */
  getLoanInfoForPortfolioAsset(params: {
    portfolio: string;
    asset: string;
  }): Promise<any> {
    return this.getPrivate(
      `/api/v1/portfolios/${params.portfolio}/loans/${params.asset}`,
    );
  }

  /**
   * Acquire/repay loan
   *
   * Acquire or repay loan for a given portfolio and asset.
   */
  acquireOrRepayLoan(params: {
    portfolio: string;
    asset: string;
    amount: number;
    action: 'ACQUIRE' | 'REPAY';
  }): Promise<any> {
    const { portfolio, asset, ...body } = params;
    return this.postPrivate(`/api/v1/portfolios/${portfolio}/loans/${asset}`, {
      body,
    });
  }

  /**
   * Preview loan update
   *
   * Preview acquire or repay loan for a given portfolio and asset.
   */
  previewLoanUpdate(params: {
    portfolio: string;
    asset: string;
    action: 'ACQUIRE' | 'REPAY';
    amount: string;
  }): Promise<any> {
    const { portfolio, asset, ...body } = params;
    return this.postPrivate(
      `/api/v1/portfolios/${portfolio}/loans/${asset}/preview`,
      { body },
    );
  }

  /**
   * View max loan availability
   *
   * View the maximum amount of loan that could be acquired now for a given portfolio and asset.
   */
  getMaxLoanAvailability(params: {
    portfolio: string;
    asset: string;
  }): Promise<any> {
    return this.getPrivate(
      `/api/v1/portfolios/${params.portfolio}/loans/${params.asset}/availability`,
    );
  }

  /**
   * List portfolio positions
   *
   * Returns all of the positions for a given portfolio.
   */
  getPortfolioPositions(params: { portfolio: string }): Promise<any> {
    return this.getPrivate(`/api/v1/portfolios/${params.portfolio}/positions`);
  }

  /**
   * Get position for portfolio/instrument
   *
   * Retrieves the position for a given portfolio and symbol.
   */
  getPositionForPortfolioInstrument(params: {
    portfolio: string;
    instrument: string;
  }): Promise<any> {
    return this.getPrivate(
      `/api/v1/portfolios/${params.portfolio}/positions/${params.instrument}`,
    );
  }

  /**
   * Get total open position limit
   *
   * Retrieves the total open position limit across instruments for a given portfolio.
   */
  getTotalOpenPositionLimit(params: { portfolio: string }): Promise<any> {
    return this.getPrivate(
      `/api/v1/portfolios/${params.portfolio}/position-limits`,
    );
  }

  /**
   * List open position limits for all instruments
   *
   * Retrieves position limits for all positions a given portfolio currently has or has opened in the past.
   */
  getOpenPositionLimitsForAllInstruments(params: {
    portfolio: string;
  }): Promise<any> {
    return this.getPrivate(
      `/api/v1/portfolios/${params.portfolio}/position-limits/positions`,
    );
  }

  /**
   * Get open position limits for portfolio instrument
   *
   * Retrieves the position limits for a given portfolio and symbol.
   */
  getOpenPositionLimitsForInstrument(params: {
    portfolio: string;
    instrument: string;
  }): Promise<any> {
    const { portfolio, instrument } = params;
    return this.getPrivate(
      `/api/v1/portfolios/${portfolio}/position-limits/positions/${instrument}`,
    );
  }

  /**
   * List fills by portfolios
   *
   * Returns fills for specified portfolios or fills for all portfolios if none are provided.
   */
  getFillsByPortfolios(params?: GetINTXFillsByPortfoliosRequest): Promise<any> {
    return this.getPrivate('/api/v1/portfolios/fills', params);
  }

  /**
   * List portfolio fills
   *
   * Returns all of the fills for a given portfolio.
   */
  getPortfolioFills(params: GetINTXPortfolioFillsRequest): Promise<any> {
    const { portfolio, ...query } = params;
    return this.getPrivate(`/api/v1/portfolios/${portfolio}/fills`, query);
  }

  /**
   * Enable/Disable portfolio cross collateral
   *
   * Enable or disable the cross collateral feature for the portfolio, which allows the portfolio to use non-USDC assets as collateral for margin trading.
   */
  setCrossCollateral(params: {
    portfolio: string;
    enabled: boolean;
  }): Promise<any> {
    const { portfolio, ...body } = params;
    return this.postPrivate(
      `/api/v1/portfolios/${portfolio}/cross-collateral-enabled`,
      { body: body },
    );
  }

  /**
   * Enable/Disable portfolio auto margin mode
   *
   * Enable or disable the auto margin feature, which lets the portfolio automatically
   * post margin amounts required to exceed the high leverage position restrictions.
   */
  setAutoMargin(params: { portfolio: string; enabled: boolean }): Promise<any> {
    const { portfolio, ...body } = params;
    return this.postPrivate(
      `/api/v1/portfolios/${portfolio}/auto-margin-enabled`,
      { body: body },
    );
  }

  /**
   * Set portfolio margin override
   *
   * Specify the margin override value for a portfolio to either increase notional requirements or opt-in to higher leverage.
   */
  setPortfolioMarginOverride(params: {
    portfolio_id: string;
    margin_override: string;
  }): Promise<any> {
    return this.postPrivate('/api/v1/portfolios/margin', { body: params });
  }

  /**
   * Get fund transfer limit between portfolios
   *
   * Retrieves the maximum amount that can be transferred between portfolios for a specific asset.
   * This applies to transfers between portfolios of the same beneficial owner.
   */
  getFundTransferLimit(params: {
    portfolio: string;
    asset: string;
  }): Promise<any> {
    const { portfolio, asset } = params;
    return this.getPrivate(
      `/api/v1/portfolios/transfer/${portfolio}/${asset}/transfer-limit`,
    );
  }

  /**
   * Transfer funds between portfolios
   *
   * Transfer assets from one portfolio to another.
   */
  transferFundsBetweenPortfolios(
    params: TransferINTXFundsBetweenPortfoliosRequest,
  ): Promise<any> {
    return this.postPrivate('/api/v1/portfolios/transfer', { body: params });
  }

  /**
   * Transfer positions between portfolios
   *
   * Transfer an existing position from one portfolio to another. The position transfer must fulfill the same portfolio-level margin requirements as submitting a new order on the opposite side for the sender's portfolio and a new order on the same side for the recipient's portfolio.
   * Additionally, organization-level requirements must be satisfied when evaluating the outcome of the position transfer.
   */
  transferPositionsBetweenPortfolios(
    params: TransferINTXPositionsBetweenPortfoliosRequest,
  ): Promise<any> {
    return this.postPrivate('/api/v1/portfolios/transfer-position', {
      body: params,
    });
  }

  /**
   * List portfolio fee rates
   *
   * Retrieves the Perpetual Future and Spot fee rate tiers for the user.
   */
  getPortfolioFeeRates(): Promise<any> {
    return this.getPrivate('/api/v1/portfolios/fee-rates');
  }
  /**
   *
   * Rankings Endpoints
   *
   */

  /**
   * Get your rankings
   *
   * Retrieve your volume rankings for maker, taker, and total volume.
   */
  getRankings(params: {
    instrument_type: string;
    period?: string;
    instruments?: string;
  }): Promise<any> {
    return this.getPrivate('/api/v1/rankings/statistics', params);
  }

  /**
   *
   * Transfers Endpoints
   *
   */

  /**
   * List matching transfers
   *
   * List matching transfers.
   */
  getMatchingTransfers(params?: GetINTXMatchingTransfersRequest): Promise<any> {
    return this.getPrivate('/api/v1/transfers', params);
  }

  /**
   * Get transfer
   *
   * Get transfer.
   */
  getTransfer(params: { transfer_uuid: string }): Promise<any> {
    return this.getPrivate(`/api/v1/transfers/${params.transfer_uuid}`);
  }

  /**
   * Withdraw to crypto address
   *
   * Withdraw to crypto address.
   */
  withdrawToCryptoAddress(
    params: INTXWithdrawToCryptoAddressRequest,
  ): Promise<any> {
    return this.postPrivate('/api/v1/transfers/withdraw', { body: params });
  }

  /**
   * Create crypto address
   *
   * Create crypto address.
   */
  createCryptoAddress(params: {
    portfolio: string;
    asset: string;
    network_arn_id: string;
  }): Promise<any> {
    return this.postPrivate('/api/v1/transfers/address', { body: params });
  }

  /**
   * Create counterparty Id
   *
   * Create counterparty Id.
   */
  createCounterpartyId(params: { portfolio: string }): Promise<any> {
    return this.postPrivate('/api/v1/transfers/create-counterparty-id', {
      body: params,
    });
  }

  /**
   * Validate counterparty Id
   *
   * Validate counterparty Id.
   */
  validateCounterpartyId(params: { counterparty_id: string }): Promise<any> {
    return this.postPrivate('/api/v1/transfers/validate-counterparty-id', {
      body: params,
    });
  }

  /**
   * Get counterparty withdrawal limit
   *
   * Retrieves the maximum amount that can be withdrawn to a counterparty within the Coinbase transfer network
   * for a specific portfolio and asset.
   */
  getCounterpartyWithdrawalLimit(params: {
    portfolio: string;
    asset: string;
  }): Promise<any> {
    const { portfolio, asset } = params;
    return this.getPrivate(
      `/api/v1/transfers/withdraw/${portfolio}/${asset}/counterparty-withdrawal-limit`,
    );
  }

  /**
   * Withdraw to counterparty Id
   *
   * Withdraw to counterparty Id.
   */
  withdrawToCounterpartyId(
    params: INTXWithdrawToCounterpartyIdRequest,
  ): Promise<any> {
    return this.postPrivate('/api/v1/transfers/withdraw/counterparty', {
      body: params,
    });
  }
  /**
   *
   * Fee Rates Endpoints
   *
   */

  /**
   * List fee rate tiers
   *
   * Return all the fee rate tiers.
   */
  getFeeRateTiers(): Promise<any> {
    return this.getPrivate('/api/v1/fee-rate-tiers');
  }
}
