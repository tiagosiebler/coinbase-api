/**
 *
 * Assets Endpoints
 *
 */

/**
 *
 * Index Endpoints
 *
 */

export interface GetINTXIndexCompositionHistory {
  index: string;
  time_from?: string;
  result_limit?: number;
  result_offset?: number;
}

export interface GetINTXIndexCandles {
  index: string;
  granularity: string;
  start: string;
  end?: string;
}

/**
 *
 * Instruments Endpoints
 *
 */

export interface GetINTXDailyTradingVolumes {
  instruments: string;
  result_limit?: number;
  result_offset?: number;
  time_from?: string;
  show_other?: boolean;
}

export interface GetINTXAggregatedCandlesData {
  instrument: string;
  granularity: string;
  start: string;
  end?: string;
}
/**
 *
 * Position Offsets Endpoints
 *
 */

/**
 *
 * Orders Endpoints
 *
 */

export interface SubmitINTXOrderRequest {
  client_order_id?: string;
  side: string;
  size: string;
  tif: string;
  instrument: string;
  type: string;
  price?: string;
  stop_price?: string;
  stop_limit_price?: string;
  expire_time?: string;
  portfolio?: string;
  user?: string;
  stp_mode?: string;
  post_only?: boolean;
  close_only?: boolean;
  algo_strategy: boolean;
}

export interface GetINTXOpenOrdersRequest {
  portfolio?: string;
  instrument?: string;
  instrument_type?: string;
  client_order_id?: string;
  event_type?: string;
  order_type?: string;
  side?: string;
  ref_datetime?: string;
  result_limit?: number;
  result_offset?: number;
}

export interface CancelINTXOrdersRequest {
  portfolio: string;
  instrument?: string;
  side?: string;
  instrument_type?: string;
}

export interface UpdateINTXOpenOrderRequest {
  id: string;
  client_order_id?: string;
  portfolio?: string;
  price?: string;
  stop_price?: string;
  size?: string;
}

/**
 *
 * Portfolios Endpoints
 *
 */

export interface UpdateINTXPortfolioParametersRequest {
  auto_margin_enabled?: boolean;
  cross_collateral_enabled?: boolean;
  position_offsets_enabled?: boolean;
  pre_launch_trading_enabled?: boolean;
  portfolio_name?: string;
}

export interface GetINTXFillsByPortfoliosRequest {
  portfolios?: string;
  order_id?: string;
  client_order_id?: string;
  ref_datetime?: string;
  result_limit?: number;
  result_offset?: number;
  time_from?: string;
}

export interface GetINTXPortfolioFillsRequest {
  portfolio: string;
  order_id?: string;
  client_order_id?: string;
  ref_datetime?: string;
  result_limit?: number;
  result_offset?: number;
  time_from?: string;
}

export interface TransferINTXFundsBetweenPortfoliosRequest {
  from: string;
  to: string;
  asset: string;
  amount: string;
}

export interface TransferINTXPositionsBetweenPortfoliosRequest {
  from: string;
  to: string;
  instrument: string;
  quantity: string;
  side: string;
}

/**
 *
 * Rankings Endpoints
 *
 */

/**
 *
 * Transfers Endpoints
 *
 */

export interface GetINTXMatchingTransfersRequest {
  portfolio?: string;
  portfolios?: string;
  time_from?: string;
  time_to?: string;
  result_limit?: number;
  result_offset?: number;
  status?: string;
  type?: string;
}

export interface INTXWithdrawToCryptoAddressRequest {
  portfolio: string;
  asset: string;
  amount: string;
  add_network_fee_to_total?: boolean;
  network_arn_id: string;
  address: string;
  nonce: number;
}

export interface INTXWithdrawToCounterpartyIdRequest {
  portfolio: string;
  counterparty_id: string;
  asset: string;
  amount: string;
  nonce: number;
}
/**
 *
 * Fee Rates Endpoints
 *
 */
