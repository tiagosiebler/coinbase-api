/**
 *
 * Account Endpoints
 *
 */

import { OrderConfiguration } from 'types/shared.types';

/**
 *
 * Products Endpoints
 *
 */

/**
 *
 * Orders Endpoints
 *
 */

// Create order request type
export interface SubmitOrderRequest {
  client_order_id: string;
  product_id: string;
  side: 'BUY' | 'SELL';
  order_configuration: OrderConfiguration;
  leverage?: string;
  margin_type?: 'CROSS' | 'ISOLATED';
  retail_portfolio_id?: string;
  preview_id?: string;
}

export interface ListOrdersParams {
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
  user_native_currency?: string;
}

/**
 *
 * Portfolios Endpoints
 *
 */

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

/**
 *
 * Fees Endpoints
 *
 */

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
