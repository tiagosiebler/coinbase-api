/**
 *
 * Assets Endpoints
 *
 */

/**
 *
 * Instruments Endpoints
 *
 */

export interface GetDailyTradingVolumes {
  instruments: string;
  result_limit?: number;
  result_offset?: number;
  time_from?: string;
  show_other?: boolean;
}

export interface GetAggregatedCandlesData {
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

export interface SubmitOrderRequest {
  client_order_id: string;
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
}

export interface GetOpenOrdersRequest {
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

export interface CancelOrdersRequest {
  portfolio: string;
  instrument?: string;
  side?: string;
  instrument_type?: string;
}

export interface UpdateOpenOrderRequest {
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

export interface UpdatePortfolioParametersRequest {
  auto_margin_enabled?: boolean;
  cross_collateral_enabled?: boolean;
  position_offsets_enabled?: boolean;
  pre_launch_trading_enabled?: boolean;
  portfolio_name?: string;
}

export interface GetFillsByPortfoliosRequest {
  portfolios?: string;
  order_id?: string;
  client_order_id?: string;
  ref_datetime?: string;
  result_limit?: number;
  result_offset?: number;
  time_from?: string;
}

export interface GetPortfolioFillsRequest {
  portfolio: string;
  order_id?: string;
  client_order_id?: string;
  ref_datetime?: string;
  result_limit?: number;
  result_offset?: number;
  time_from?: string;
}

export interface TransferFundsBetweenPortfoliosRequest {
  from: string;
  to: string;
  asset: string;
  amount: string;
}

export interface TransferPositionsBetweenPortfoliosRequest {
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

export interface GetMatchingTransfersRequest {
  portfolio?: string;
  portfolios?: string;
  time_from?: string;
  time_to?: string;
  result_limit?: number;
  result_offset?: number;
  status?: string;
  type?: string;
}

export interface WithdrawToCryptoAddressRequest {
  portfolio: string;
  asset: string;
  amount: string;
  add_network_fee_to_total?: boolean;
  network_arn_id: string;
  address: string;
  nonce: number;
}

export interface WithdrawToCounterpartyIdRequest {
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
