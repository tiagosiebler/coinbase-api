import { OrderConfiguration } from 'types/shared.types';

/**
 *
 * Account Endpoints
 *
 */

/**
 *
 * Products Endpoints
 *
 */

export interface GetAdvTradeProductsRequest {
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
}

export interface GetAdvTradeProductCandlesRequest {
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
}

export interface GetAdvTradeMarketTradesRequest {
  product_id: string;
  limit: number;
  start?: string;
  end?: string;
}

/**
 *
 * Orders Endpoints
 *
 */

// Create order request type
export interface SubmitAdvTradeOrderRequest {
  client_order_id: string;
  product_id: string;
  side: 'BUY' | 'SELL';
  order_configuration: OrderConfiguration;
  leverage?: string;
  margin_type?: 'CROSS' | 'ISOLATED';
  retail_portfolio_id?: string; // deprecated
  preview_id?: string;
}

export interface GetAdvTradeOrdersRequest {
  order_ids?: string[];
  product_ids?: string[];
  product_type?: 'UNKNOWN_PRODUCT_TYPE' | 'SPOT' | 'FUTURE';
  order_status?: string[];
  time_in_forces?: string[];
  order_types?: string[];
  order_side?: 'BUY' | 'SELL';
  start_date?: string;
  end_date?: string;
  order_placement_source?:
    | 'UNKNOWN_PLACEMENT_SOURCE'
    | 'RETAIL_SIMPLE'
    | 'RETAIL_ADVANCED';
  contract_expiry_type?:
    | 'UNKNOWN_CONTRACT_EXPIRY_TYPE'
    | 'PERPETUAL'
    | 'EXPIRING';
  asset_filters?: string[];
  retail_portfolio_id?: string;
  limit?: number;
  cursor?: string;
  sort_by?: 'UNKNOWN_SORT_BY' | 'LIMIT_PRICE' | 'LAST_FILL_TIME';
  user_native_currency?: string; // deprecated
}

export interface GetAdvTradeFillsRequest {
  order_ids?: string[];
  trade_ids?: string[];
  product_ids?: string[];
  start_sequence_timestamp?: string;
  end_sequence_timestamp?: string;
  retail_portfolio_id?: string;
  limit?: number;
  cursor?: string;
  sort_by?: 'UNKNOWN_SORT_BY' | 'PRICE' | 'TRADE_TIME';
}

export interface PreviewAdvTradeOrderRequest {
  product_id: string;
  side: 'BUY' | 'SELL';
  order_configuration: OrderConfiguration;
  leverage?: string;
  margin_type?: 'ISOLATED' | 'CROSS';
  retail_portfolio_id?: string;
}

/**
 *
 * Portfolios Endpoints
 *
 */

export interface MoveAdvTradePortfolioFundsRequest {
  funds: {
    value: string;
    currency: string;
  };
  source_portfolio_uuid: string;
  target_portfolio_uuid: string;
}

/**
 *
 * Futures Endpoints
 *
 */

/**
 *
 * Perpetuals Endpoints
 *
 */

export interface AllocateAdvTradePortfolioRequest {
  portfolio_uuid: string;
  symbol: string;
  amount: string;
  currency: string;
}
/**
 *
 * Fees Endpoints
 *
 */

export interface GetAdvTradeTransactionSummaryRequest {
  product_type?: 'UNKNOWN_PRODUCT_TYPE' | 'SPOT' | 'FUTURE';
  contract_expiry_type?: 'UNKNOWN_CONTRACT_EXPIRY_TYPE' | 'SPOT' | 'FUTURE';
  product_venue?: 'UNKNOWN_VENUE_TYPE' | 'CBE' | 'FCM' | 'INTX';
}

/**
 *
 * Converts Endpoints
 *
 */

export interface SubmitAdvTradeConvertQuoteRequest {
  from_account: string;
  to_account: string;
  amount: string;
  trade_incentive_metadata?: {
    user_incentive_id?: string;
    code_val?: string;
  };
}

/**
 *
 * Public Endpoints
 *
 */

export interface GetAdvTradePublicProductsRequest {
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
}

export interface GetAdvTradePublicProductCandlesRequest {
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
}

export interface GetAdvTradePublicMarketTradesRequest {
  product_id: string;
  limit: number;
  start?: string;
  end?: string;
}
/**
 *
 * Payment Methods Endpoints
 *
 */

/**
 *
 * Data API Endpoints
 *
 */
