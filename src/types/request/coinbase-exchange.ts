/**
 *
 * Accounts Endpoints
 *
 */
export interface GetAccountHoldsRequest {
  account_id: string;
  before?: string;
  after?: string;
  limit?: number;
}
export interface GetAccountLedgerRequest {
  account_id: string;
  start_date?: string;
  end_date?: string;
  before?: string;
  after?: string;
  limit?: number;
  profile_id?: string;
}

export interface GetAccountTransfersRequest {
  account_id: string;
  before?: string;
  after?: string;
  limit?: number;
  type?: string;
}

/**
 *
 * Address book Endpoints
 *
 */

export interface GetAddressBookRequest {
  addresses: {
    currency: string;
    to: {
      address: string;
      destination_tag?: string;
    };
    label?: string;
    is_verified_self_hosted_wallet?: boolean;
    vasp_id?: string;
  }[];
}

/**
 *
 * Coinbase Account Endpoints
 *
 */

export interface CreateNewCryptoAddress {
  account_id: string;
  profile_id?: string;
  network?: string;
}

/**
 *
 * Conversions Endpoints
 *
 */

export interface ConvertCurrencyRequest {
  profile_id: string;
  from: string;
  to: string;
  amount: string;
  nonce: string;
}

/**
 *
 * Currencies Endpoints
 *
 */

/**
 *
 * Transfers Endpoints
 *
 */

export interface DepositFromCoinbaseAccount {
  profile_id: string;
  amount: string;
  coinbase_account_id: string;
  currency: string;
}

export interface DepositFromPaymentMethod {
  profile_id: string;
  amount: string;
  payment_method_id: string;
  currency: string;
}

export interface GetTransfersRequest {
  profile_id?: string;
  before?: string;
  after?: string;
  limit?: number;
  type?: string;
  currency_type?: string;
  transfer_reason?: string;
  currency?: string;
}

export interface SubmitTravelInformation {
  transfer_id: string;
  originator_name: string;
  originator_country: string;
}

export interface WithdrawToCBAccount {
  profile_id: string;
  amount: string;
  coinbase_account_id: string;
  currency: string;
}

export interface WithdrawToCryptoAddress {
  profile_id: string;
  amount: string;
  currency: string;
  crypto_address: string;
  destination_tag?: string;
  no_destination_tag?: boolean;
  nonce?: number;
  network?: string;
  add_network_fee_to_total?: boolean;
  is_intermediary?: boolean;
  intermediary_jurisdiction?: string;
  travel_rule_data?: object;
}

export interface GetCryptoWithdrawalFeeEstimate {
  currency: string;
  crypto_address: string;
  network?: string;
}

export interface WithdrawToPaymentMethod {
  profile_id: string;
  amount: string;
  payment_method_id: string;
  currency: string;
}

/**
 *
 * Fees Endpoints
 *
 */

/**
 *
 * Orders Endpoints
 *
 */

export interface GetFillsRequest {
  order_id?: string;
  product_id?: string;
  limit?: number;
  before?: string;
  after?: string;
  market_type?: string;
  start_date?: string;
  end_date?: string;
}

export interface GetOrdersRequest {
  profile_id?: string;
  product_id?: string;
  sortedBy?: string;
  sorting?: string;
  start_date?: string;
  end_date?: string;
  before?: string;
  after?: string;
  limit: number;
  status: string[];
  market_type?: string;
}

export interface SubmitOrderRequest {
  profile_id?: string;
  type: string;
  side: string;
  product_id: string;
  stp?: string;
  stop?: string;
  stop_price?: string;
  price?: string;
  size?: string;
  funds?: string;
  time_in_force?: string;
  cancel_after?: string;
  post_only?: boolean;
  client_oid?: string;
  max_floor?: string;
  stop_limit_price?: string;
}

export interface CancelOrderRequest {
  order_id: string;
  profile_id?: string;
  product_id?: string;
}

/**
 *
 * Loans Endpoints
 *
 */

export interface SubmitNewLoan {
  loan_id: string;
  currency: string;
  native_amount: string;
  interest_rate: string;
  term_start_date: string;
  term_end_date: string;
  profile_id: string;
}

export interface RepayLoanInterest {
  idem: string;
  from_profile_id: string;
  currency: string;
  native_amount: string;
}

export interface RepayLoanPrincipal {
  loan_id: string;
  idem: string;
  from_profile_id: string;
  currency: string;
  native_amount: string;
}

export interface GetPrincipalRepaymentPreview {
  loan_id: string;
  currency: string;
  native_amount: string;
}
/**
 *
 * Coinbase Price Oracle Endpoints
 *
 */

/**
 *
 * Products Endpoints
 *
 */

export interface GetProductCandles {
  product_id: string;
  granularity: number;
  start?: string;
  end?: string;
}

export interface GetProductTrades {
  product_id: string;
  limit?: number;
  before?: string;
  after?: string;
}

/**
 *
 * Profiles Endpoints
 *
 */

export interface TransferFundsBetweenProfiles {
  from: string;
  to: string;
  currency: string;
  amount: string;
}

/**
 *
 * Reports Endpoints
 *
 */

export interface GetAllReports {
  profile_id?: string;
  after?: string;
  limit?: number;
  type?: string;
  ignore_expired?: boolean;
}

export interface CreateReport {
  type: string;
  year?: string;
  format?: string;
  email?: string;
  profile_id?: string;
  balance?: { datetime?: string; group_by_profile?: boolean };
  fills?: { start_date?: string; end_date?: string; product_id?: string };
  account?: { start_date?: string; end_date?: string; account_id?: string };
  otc_fills?: { start_date?: string; end_date?: string; product_id?: string };
  tax_invoice?: {
    start_date?: string;
    end_date?: string;
    product_id?: string;
  };
  rfq_fills?: { start_date?: string; end_date?: string; product_id?: string };
}

/**
 *
 * Travel Rule Endpoints
 *
 */

export interface GetTravelRuleInformation {
  before?: string;
  after?: string;
  limit?: number;
  address?: string;
}
/**
 *
 * Users Endpoints
 *
 */

/**
 *
 * Wrapped Assets Endpoints
 *
 */

export interface GetAllStakeWraps {
  before?: string;
  after?: string;
  limit?: number;
  from?: string;
  to?: string;
  status?: string;
}
