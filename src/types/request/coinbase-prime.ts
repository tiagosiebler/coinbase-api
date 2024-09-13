/**
 *
 * Allocation Endpoints
 *
 */

export interface CreatePrimePortfolioAllocationsRequest {
  allocation_id?: string;
  source_portfolio_id?: string;
  product_id?: string;
  order_ids?: string[];
  allocation_legs: {
    allocation_leg_id: string;
    destination_portfolio_id: string;
    amount: string;
  }[];
  size_type?: 'BASE' | 'QUOTE' | 'PERCENT';
  remainder_destination_portfolio?: string;
}

export interface CreatePrimePortfolioNetAllocationsRequest {
  netting_id?: string;
  source_portfolio_id?: string;
  product_id?: string;
  order_ids?: string[];
  allocation_legs: {
    allocation_leg_id: string;
    destination_portfolio_id: string;
    amount: string;
  }[];
  size_type?: 'BASE' | 'QUOTE' | 'PERCENT';
  remainder_destination_portfolio?: string;
}

export interface GetPrimePortfolioAllocationsRequest {
  portfolio_id: string;
  product_ids?: string[];
  order_side?: 'BUY' | 'SELL';
  start_date?: string;
  end_date?: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
}
/**
 *
 * Invoice Endpoints
 *
 */

export interface GetPrimeInvoicesRequest {
  entity_id: string;
  states?: string[];
  billing_year?: number;
  billing_month?: number;
  cursor?: number;
  limit?: number;
}
/**
 *
 * Assets Endpoints
 *
 */

/**
 *
 * Payment Methods Endpoints
 *
 */

/**
 *
 * Users Endpoints
 *
 */

export interface GetPrimeUsersRequest {
  entity_id: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'ASC' | 'DESC';
}

export interface GetPrimePortfolioUsersRequest {
  portfolio_id: string;
  cursor?: string;
  limit?: number;
  sort_direction?: string;
}
/**
 *
 * Portfolios Endpoints
 *
 */

/**
 *
 * Activities Endpoints
 *
 */

export interface GetPrimeActivitiesRequest {
  portfolio_id: string;
  symbols?: string[];
  categories?: string[];
  statuses?: string[];
  start_time?: string;
  end_time?: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'ASC' | 'DESC';
}
/**
 *
 * Address Book Endpoints
 *
 */

export interface GetPrimeAddressBookRequest {
  portfolio_id: string;
  currency_symbol?: string;
  search?: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
}

export interface CreatePrimeAddressBookEntryRequest {
  portfolio_id: string;
  address: string;
  currency_symbol: string;
  name: string;
  account_identifier?: string;
}
/**
 *
 * Balances Endpoints
 *
 */

export interface GetPrimeWeb3WalletBalancesRequest {
  portfolio_id: string;
  wallet_id: string;
  visibility_statuses?: string[];
  cursor?: string;
  limit?: number;
}

/**
 *
 * Commission Endpoints
 *
 */

/**
 *
 * Orders Endpoints
 *
 */

export interface GetPrimeOpenOrdersRequest {
  portfolio_id: string;
  product_ids?: string[];
  order_type?: 'MARKET' | 'LIMIT' | 'TWAP' | 'BLOCK' | 'VWAP' | 'STOP_LIMIT';
  sort_direction?: 'DESC' | 'ASC';
  start_date: string;
  order_side?: 'BUY' | 'SELL';
  end_date?: string;
}

export interface SubmitPrimeOrderRequest {
  portfolio_id: string;
  product_id: string;
  side: 'BUY' | 'SELL';
  client_order_id?: string;
  type?: 'MARKET' | 'LIMIT' | 'TWAP' | 'VWAP' | 'STOP_LIMIT';
  base_quantity?: string;
  quote_value?: string;
  limit_price?: string;
  stop_price?: string;
  start_time?: string;
  expiry_time?: string;
  time_in_force?:
    | 'FILL_OR_KILL'
    | 'GOOD_UNTIL_DATE_TIME'
    | 'GOOD_UNTIL_CANCELLED'
    | 'IMMEDIATE_OR_CANCEL';
  stp_id?: string;
  display_quote_size?: string;
  display_base_size?: string;
  is_raise_exact?: boolean;
  historical_pov?: string;
}

export interface GetPrimeOrderPreviewRequest {
  portfolio_id: string;
  product_id: string;
  side: 'BUY' | 'SELL';
  type?: 'MARKET' | 'LIMIT' | 'TWAP' | 'BLOCK' | 'VWAP' | 'STOP_LIMIT';
  base_quantity?: string;
  quote_value?: string;
  limit_price?: string;
  stop_price?: string;
  start_time?: string;
  expiry_time?: string;
  time_in_force?:
    | 'FILL_OR_KILL'
    | 'GOOD_UNTIL_DATE_TIME'
    | 'GOOD_UNTIL_CANCELLED'
    | 'IMMEDIATE_OR_CANCEL';
  is_raise_exact?: boolean;
  historical_pov?: string;
}

export interface GetPrimePortfolioOrdersRequest {
  portfolio_id: string;
  order_statuses?: (
    | 'FILLED'
    | 'CANCELLED'
    | 'EXPIRED'
    | 'FAILED'
    | 'PENDING'
  )[];
  product_ids?: string[];
  order_type?: 'MARKET' | 'LIMIT' | 'TWAP' | 'BLOCK' | 'VWAP' | 'STOP_LIMIT';
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
  order_side?: 'BUY' | 'SELL';
  start_date?: string;
  end_date?: string;
}

export interface GetPrimeOrderFillsRequest {
  portfolio_id: string;
  order_id: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
}
/**
 *
 * Products Endpoints
 *
 */

export interface GetPrimePortfolioProductsRequest {
  portfolio_id: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
}

/**
 *
 * Transactions Endpoints
 *
 */

export interface GetPrimePortfolioTransactionsRequest {
  portfolio_id: string;
  symbols?: string[];
  types?: string[];
  start_time?: string;
  end_time?: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
}

export interface CreatePrimeConversionRequest {
  portfolio_id: string;
  wallet_id: string;
  amount: string;
  destination: string;
  idempotency_key: string;
  source_symbol: string;
  destination_symbol: string;
}

export interface GetPrimeWalletTransactionsRequest {
  portfolio_id: string;
  wallet_id: string;
  types?: string[];
  start_time?: string;
  end_time?: string;
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
}

export interface CreatePrimeTransferRequest {
  portfolio_id: string;
  wallet_id: string;
  amount: string;
  destination: string;
  idempotency_key: string;
  currency_symbol: string;
}

export interface CreatePrimeWithdrawalRequest {
  portfolio_id: string;
  wallet_id: string;
  amount: string;
  destination_type: 'DESTINATION_PAYMENT_METHOD' | 'DESTINATION_BLOCKCHAIN';
  idempotency_key: string;
  currency_symbol: string;
  payment_method?: {
    payment_method_id: string;
  };
  blockchain_address?: {
    address: string;
    account_identifier?: string;
  };
}
/**
 *
 * Wallets Endpoints
 *
 */

export interface GetPrimePortfolioWalletsRequest {
  portfolio_id: string;
  type: 'VAULT' | 'TRADING' | 'WALLET_TYPE_OTHER' | 'WEB3';
  cursor?: string;
  limit?: number;
  sort_direction?: 'DESC' | 'ASC';
  symbols?: string[];
}

export interface CreatePrimeWalletRequest {
  portfolio_id: string;
  name: string;
  symbol: string;
  wallet_type: 'VAULT' | 'TRADING' | 'WALLET_TYPE_OTHER' | 'WEB3';
}

export interface GetPrimeWalletDepositInstructionsRequest {
  portfolio_id: string;
  wallet_id: string;
  deposit_type?:
    | 'UNKNOWN_WALLET_DEPOSIT_TYPE'
    | 'CRYPTO'
    | 'WIRE'
    | 'SEN'
    | 'SWIFT';
}
