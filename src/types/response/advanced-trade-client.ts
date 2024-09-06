/**
 *
 * Account Endpoints
 *
 */

import { OrderConfiguration } from 'types/shared.types';

interface Balance {
  value: string;
  currency: string;
}

export interface Account {
  uuid: string;
  name: string;
  currency: string;
  available_balance: Balance;
  default: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  type: string;
  ready: boolean;
  hold: Balance;
  retail_portfolio_id: string;
}

export interface AccountsList {
  accounts: Account[];
  has_next: boolean;
  cursor: string;
  size: number;
}

/**
 *
 * Products Endpoints
 *
 */

interface PriceLevel {
  price: string;
  size: string;
}

export interface Pricebook {
  product_id: string;
  bids: PriceLevel[];
  asks: PriceLevel[];
  time: string;
}

export interface BestBidAsk {
  pricebooks: { [productId: string]: Pricebook };
}

interface FCMTradingSessionDetails {
  is_session_open: boolean;
  open_time: string;
  close_time: string;
  session_state: string;
  after_hours_order_entry_disabled: boolean;
}

interface PerpetualDetails {
  open_interest: string;
  funding_rate: string;
  funding_time: string;
  max_leverage: string;
  base_asset_uuid: string;
  underlying_type: string;
}

interface FutureProductDetails {
  venue: string;
  contract_code: string;
  contract_expiry: string;
  contract_size: string;
  contract_root_unit: string;
  group_description: string;
  contract_expiry_timezone: string;
  group_short_description: string;
  risk_managed_by: string;
  contract_expiry_type: string;
  perpetual_details: PerpetualDetails;
  contract_display_name: string;
  time_to_expiry_ms: string;
  non_crypto: boolean;
  contract_expiry_name: string;
}

export interface Product {
  product_id: string;
  price: string;
  price_percentage_change_24h: string;
  volume_24h: string;
  volume_percentage_change_24h: string;
  base_increment: string;
  quote_increment: string;
  quote_min_size: string;
  quote_max_size: string;
  base_min_size: string;
  base_max_size: string;
  base_name: string;
  quote_name: string;
  watched: boolean;
  is_disabled: boolean;
  new: boolean;
  status: string;
  cancel_only: boolean;
  limit_only: boolean;
  post_only: boolean;
  trading_disabled: boolean;
  auction_mode: boolean;
  product_type: string;
  quote_currency_id: string;
  base_currency_id: string;
  fcm_trading_session_details: FCMTradingSessionDetails;
  mid_market_price: string;
  alias: string;
  alias_to: string[];
  base_display_symbol: string;
  quote_display_symbol: string;
  view_only: boolean;
  price_increment: string;
  display_name: string;
  product_venue: string;
  approximate_quote_24h_volume: string;
  future_product_details: FutureProductDetails;
}

export interface Candle {
  start: string;
  low: string;
  high: string;
  open: string;
  close: string;
  volume: string;
}

interface Trade {
  trade_id: string;
  product_id: string;
  price: string;
  size: string;
  time: string; // RFC3339 Timestamp
  side: 'BUY' | 'SELL';
}

export interface MarketTrades {
  trades: Trade[];
  best_bid: string;
  best_ask: string;
}

/**
 *
 * Orders Endpoints
 *
 */

// Response interfaces
interface SuccessOrderResponse {
  order_id: string;
  product_id: string;
  side: 'BUY' | 'SELL';
  client_order_id: string;
}

interface ErrorOrderResponse {
  error?: string;
  message: string;
  error_details: string;
  preview_failure_reason?: string;
  new_order_failure_reason: string;
  order_configuration: OrderConfiguration;
}

export interface SubmitOrderResponse {
  success: boolean;
  success_response?: SuccessOrderResponse;
  error_response?: ErrorOrderResponse;
}

export interface CancelOrdersResponse {
  results: {
    success: boolean;
    failure_reason: string;
    order_id: string;
  }[];
}

export interface EditOrderResponse {
  success: boolean;
  success_response?: {
    order_id: string;
  };
  error_response?: {
    error_details?: string;
    edit_order_failure_reason: string;
    errors?: {
      edit_failure_reason?: string;
      preview_failure_reason?: string;
    }[];
  };
}

export interface EditOrderPreviewResponse {
  errors?: {
    edit_failure_reason?: string;
    preview_failure_reason?: string;
  };
  slippage?: string;
  order_total?: string;
  commission_total?: string;
  quote_size?: number;
  base_size?: number;
  best_bid?: string;
  best_ask?: string;
  average_filled_price?: string;
}

export interface Order {
  order_id: string;
  product_id: string;
  user_id: string;
  order_configuration: OrderConfiguration;
  side: 'BUY' | 'SELL';
  client_order_id: string;
  status: string;
  time_in_force?: string;
  created_time: string;
  completion_percentage: string;
  filled_size: string;
  average_filled_price: string;
  fee?: string;
  number_of_fills: string;
  filled_value: string;
  pending_cancel: boolean;
  size_in_quote: boolean;
  total_fees: string;
  size_inclusive_of_fees: boolean;
  total_value_after_fees: string;
  trigger_status?: string;
  order_type: string;
  reject_reason?: string;
  settled: boolean;
  product_type: string;
  reject_message?: string;
  cancel_message?: string;
  order_placement_source: string;
  outstanding_hold_amount: string;
  is_liquidation: boolean;
  last_fill_time?: string;
  edit_history?: Array<{
    price: string;
    size: string;
    replace_accept_timestamp: string;
  }>;
  leverage?: string;
  margin_type?: string;
  retail_portfolio_id?: string;
}

export interface Fill {
  entry_id: string;
  trade_id: string;
  order_id: string;
  trade_time: string; // RFC3339 Timestamp
  trade_type: string;
  price: string;
  size: string;
  commission: string;
  product_id: string;
  sequence_timestamp: string; // RFC3339 Timestamp
  liquidity_indicator: string;
  size_in_quote: boolean;
  user_id: string;
  side: string;
  retail_portfolio_id: string;
}

export interface OrderPreview {
  order_total: string;
  commission_total: string;
  errs: string[];
  warning: string[];
  quote_size: string;
  base_size: string;
  best_bid: string;
  best_ask: string;
  is_max: boolean;
  order_margin_total?: string;
  leverage?: string;
  long_leverage?: string;
  short_leverage?: string;
  slippage?: string;
  preview_id?: string;
  current_liquidation_buffer?: string;
  projected_liquidation_buffer?: string;
  max_leverage?: string;
}

export interface ClosePositionResponse {
  success: boolean;
  success_response?: {
    order_id: string;
    product_id: string;
    side: string;
    client_order_id: string;
  };
  error_response?: {
    error: string;
    message: string;
    error_details: string;
    preview_failure_reason: string;
    new_order_failure_reason: string;
  };
  order_configuration?: OrderConfiguration;
}
/**
 *
 * Portfolios Endpoints
 *
 */

export interface Portfolio {
  name: string;
  uuid: string;
  type: 'UNDEFINED' | 'DEFAULT' | 'CONSUMER' | 'INTX';
  deleted: boolean;
}

export interface MonetaryAmount {
  value: string;
  currency: string;
}

export interface SpotPortfolioPosition {
  asset: string;
  account_uuid: string;
  total_balance_fiat: number;
  total_balance_crypto: number;
  available_to_trade_fiat: number;
  allocation: number;
  one_day_change: number;
  cost_basis: MonetaryAmount;
  asset_img_url: string;
  is_cash: boolean;
}

export interface PerpPortfolioPosition {
  product_id: string;
  product_uuid: string;
  symbol: string;
  asset_image_url: string;
  vwap: MonetaryAmount;
  userNativeCurrency: MonetaryAmount;
  rawCurrency: MonetaryAmount;
  position_side:
    | 'FUTURES_POSITION_SIDE_UNSPECIFIED'
    | 'FUTURES_POSITION_SIDE_LONG'
    | 'FUTURES_POSITION_SIDE_SHORT';
  net_size: string;
  buy_order_size: string;
  sell_order_size: string;
  im_contribution: string;
  unrealized_pnl: MonetaryAmount;
  mark_price: MonetaryAmount;
  liquidation_price: MonetaryAmount;
  leverage: string;
  im_notional: MonetaryAmount;
  mm_notional: MonetaryAmount;
  position_notional: MonetaryAmount;
  margin_type:
    | 'MARGIN_TYPE_UNSPECIFIED'
    | 'MARGIN_TYPE_CROSS'
    | 'MARGIN_TYPE_ISOLATED';
  liquidation_buffer: string;
  liquidation_percentage: string;
}

export interface FuturesPortfolioPosition {
  product_id: string;
  contract_size: string;
  side:
    | 'FUTURES_POSITION_SIDE_UNSPECIFIED'
    | 'FUTURES_POSITION_SIDE_LONG'
    | 'FUTURES_POSITION_SIDE_SHORT';
  amount: string;
  avg_entry_price: string;
  current_price: string;
  unrealized_pnl: string;
  expiry: string; // RFC3339 Timestamp
  underlying_asset: string;
  asset_img_url: string;
  product_name: string;
  venue: string;
  notional_value: string;
}

interface PortfolioBalances {
  total_balance: MonetaryAmount;
  total_futures_balance: MonetaryAmount;
  total_cash_equivalent_balance: MonetaryAmount;
  total_crypto_balance: MonetaryAmount;
  futures_unrealized_pnl: MonetaryAmount;
  perp_unrealized_pnl: MonetaryAmount;
}

export interface PortfolioBreakdown {
  portfolio: {
    name: string;
    uuid: string;
    type: 'UNDEFINED' | 'DEFAULT' | 'CONSUMER' | 'INTX'; // Possible values: [UNDEFINED, DEFAULT, CONSUMER, INTX]
    deleted: boolean;
    portfolio_balances: PortfolioBalances;
    spot_positions: SpotPortfolioPosition[];
    perp_positions: PerpPortfolioPosition[];
    futures_positions: FuturesPortfolioPosition[];
  };
}

/**
 *
 * Futures Endpoints
 *
 */

export interface FuturesBalance {
  futures_buying_power: {
    value: string;
    currency: string;
  };
  total_usd_balance: {
    value: string;
    currency: string;
  };
  cbi_usd_balance: {
    value: string;
    currency: string;
  };
  cfm_usd_balance: {
    value: string;
    currency: string;
  };
  total_open_orders_hold_amount: {
    value: string;
    currency: string;
  };
  unrealized_pnl: {
    value: string;
    currency: string;
  };
  daily_realized_pnl: {
    value: string;
    currency: string;
  };
  initial_margin: {
    value: string;
    currency: string;
  };
  available_margin: {
    value: string;
    currency: string;
  };
  liquidation_threshold: {
    value: string;
    currency: string;
  };
  liquidation_buffer_amount: {
    value: string;
    currency: string;
  };
  liquidation_buffer_percentage: string;
  intraday_margin_window_measure: {
    margin_window_type: string;
    margin_level: string;
    initial_margin: string;
    maintenance_margin: string;
    liquidation_buffer: string;
    total_hold: string;
    futures_buying_power: string;
  };
  overnight_margin_window_measure: {
    margin_window_type: string;
    margin_level: string;
    initial_margin: string;
    maintenance_margin: string;
    liquidation_buffer: string;
    total_hold: string;
    futures_buying_power: string;
  };
}

export interface CurrentMarginWindow {
  margin_window_type:
    | 'MARGIN_WINDOW_TYPE_UNSPECIFIED'
    | 'MARGIN_WINDOW_TYPE_OVERNIGHT'
    | 'MARGIN_WINDOW_TYPE_WEEKEND'
    | 'MARGIN_WINDOW_TYPE_INTRADAY'
    | 'MARGIN_WINDOW_TYPE_TRANSITION';
  end_time: string; // RFC3339 Timestamp
  is_intraday_margin_killswitch_enabled: boolean;
  is_intraday_margin_enrollment_killswitch_enabled: boolean;
}

export interface FuturesPosition {
  product_id: string;
  expiration_time: string; // RFC3339 Timestamp
  side: 'UNKNOWN' | 'LONG' | 'SHORT';
  number_of_contracts: string;
  current_price: string;
  avg_entry_price: string;
  unrealized_pnl: string;
  daily_realized_pnl: string;
}

export interface FuturesSweep {
  id: string;
  requested_amount: {
    value: string;
    currency: string;
  };
  should_sweep_all: boolean;
  status: 'UNKNOWN_FCM_SWEEP_STATUS' | 'PENDING' | 'PROCESSING';
  scheduled_time: string; // RFC3339 Timestamp
}

/**
 *
 * Perpetuals Endpoints
 *
 */

export interface PerpetualsPortfolio {
  portfolio_uuid: string;
  collateral: string;
  position_notional: string;
  open_position_notional: string;
  pending_fees: string;
  borrow: string;
  accrued_interest: string;
  rolling_debt: string;
  portfolio_initial_margin: string;
  portfolio_im_notional: {
    value: string;
    currency: string;
  };
  portfolio_maintenance_margin: string;
  portfolio_mm_notional: {
    value: string;
    currency: string;
  };
  liquidation_percentage: string;
  liquidation_buffer: string;
  margin_type: string;
  margin_flags: string;
  liquidation_status: string;
  unrealized_pnl: {
    value: string;
    currency: string;
  };
  total_balance: {
    value: string;
    currency: string;
  };
  summary: {
    unrealized_pnl: {
      value: string;
      currency: string;
    };
    buying_power: {
      value: string;
      currency: string;
    };
    total_balance: {
      value: string;
      currency: string;
    };
    max_withdrawal_amount: {
      value: string;
      currency: string;
    };
  };
}

export interface PerpetualsPosition {
  product_id: string;
  product_uuid: string;
  portfolio_uuid: string;
  symbol: string;
  vwap: {
    value: string;
    currency: string;
  };
  entry_vwap: {
    value: string;
    currency: string;
  };
  position_side: string;
  margin_type: string;
  net_size: string;
  buy_order_size: string;
  sell_order_size: string;
  im_contribution: string;
  unrealized_pnl: {
    value: string;
    currency: string;
  };
  mark_price: {
    value: string;
    currency: string;
  };
  liquidation_price: {
    value: string;
    currency: string;
  };
  leverage: string;
  im_notional: {
    value: string;
    currency: string;
  };
  mm_notional: {
    value: string;
    currency: string;
  };
  position_notional: {
    value: string;
    currency: string;
  };
  aggregated_pnl: {
    value: string;
    currency: string;
  };
  summary: {
    aggregated_pnl: {
      value: string;
      currency: string;
    };
  };
}

export interface PerpetualsAsset {
  asset_id: string;
  asset_uuid: string;
  asset_name: string;
  status: string;
  collateral_weight: string;
  account_collateral_limit: string;
  ecosystem_collateral_limit_breached: boolean;
  asset_icon_url: string;
  supported_networks_enabled: boolean;
  quantity: string;
  hold: string;
  transfer_hold: string;
  collateral_value: string;
  max_withdraw_amount: string;
  loan: string;
  loan_collateral_requirement_usd: string;
  pledged_quantity: string;
  is_margin_limit_reached: boolean;
}

/**
 *
 * Fees Endpoints
 *
 */

export interface FeeTier {
  pricing_tier: string;
  usd_from: string;
  usd_to: string;
  taker_fee_rate: string;
  maker_fee_rate: string;
  aop_from: string;
  aop_to: string;
  margin_rate: {
    value: string;
  };
  goods_and_services_tax: {
    rate: string;
    type: string;
  };
}

export interface TransactionSummary {
  total_volume: number;
  total_fees: number;
  fee_tier: FeeTier;
  advanced_trade_only_volume: number;
  advanced_trade_only_fees: number;
  coinbase_pro_volume: number;
  coinbase_pro_fees: number;
  total_balance: string;
}

/**
 *
 * Converts Endpoints
 *
 */

/**
 *
 * Public Endpoints
 *
 */

export interface PublicProduct {
  product_id: string;
  price: string;
  price_percentage_change_24h: string;
  volume_24h: string;
  volume_percentage_change_24h: string;
  base_increment: string;
  quote_increment: string;
  quote_min_size: string;
  quote_max_size: string;
  base_min_size: string;
  base_max_size: string;
  base_name: string;
  quote_name: string;
  watched: boolean;
  is_disabled: boolean;
  new: boolean;
  status: string;
  cancel_only: boolean;
  limit_only: boolean;
  post_only: boolean;
  trading_disabled: boolean;
  auction_mode: boolean;
  product_type: string;
  quote_currency_id: string;
  base_currency_id: string;
  fcm_trading_session_details?: {
    is_session_open: boolean;
    open_time: string; // RFC3339 Timestamp
    close_time: string; // RFC3339 Timestamp
    session_state: string;
    after_hours_order_entry_disabled: boolean;
  };
  mid_market_price?: string;
  alias?: string;
  alias_to?: string[];
  base_display_symbol: string;
  quote_display_symbol: string;
  view_only: boolean;
  price_increment: string;
  display_name: string;
  product_venue: string;
  approximate_quote_24h_volume?: string;
  future_product_details?: {
    venue: string;
    contract_code: string;
    contract_expiry: string; // RFC3339 Timestamp
    contract_size: string;
    contract_root_unit: string;
    group_description: string;
    contract_expiry_timezone: string;
    group_short_description: string;
    risk_managed_by: string;
    contract_expiry_type: string;
  };
  perpetual_details?: {
    open_interest: string;
    funding_rate: string;
    funding_time: string; // RFC3339 Timestamp
    max_leverage: string;
    base_asset_uuid: string;
    underlying_type: string;
    contract_display_name: string;
    time_to_expiry_ms: number;
    non_crypto: boolean;
    contract_expiry_name: string;
  };
}

/**
 *
 * Payment Methods Endpoints
 *
 */

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  currency: string;
  verified: boolean;
  allow_buy: boolean;
  allow_sell: boolean;
  allow_deposit: boolean;
  allow_withdraw: boolean;
  created_at: string; // RFC3339 Timestamp
  updated_at: string; // RFC3339 Timestamp
}

/**
 *
 * Data API Endpoints
 *
 */
