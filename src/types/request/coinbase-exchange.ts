/**
 *
 * Accounts Endpoints
 *
 */
export interface GetCBExchAccountHoldsRequest {
  account_id: string;
  before?: string;
  after?: string;
  limit?: number;
}
export interface GetCBExchAccountLedgerRequest {
  account_id: string;
  start_date?: string;
  end_date?: string;
  before?: string;
  after?: string;
  limit?: number;
  profile_id?: string;
}

export interface GetCBExchAccountTransfersRequest {
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

export interface GetCBExchAddressBookRequest {
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

export interface CreateCBExchNewCryptoAddress {
  account_id: string;
  profile_id?: string;
  network?: string;
}

/**
 *
 * Conversions Endpoints
 *
 */

export interface ConvertCBExchCurrencyRequest {
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

export interface CBExchDepositFromCoinbaseAccount {
  profile_id: string;
  amount: string;
  coinbase_account_id: string;
  currency: string;
}

export interface CBExchDepositFromPaymentMethod {
  profile_id: string;
  amount: string;
  payment_method_id: string;
  currency: string;
}

export interface CBExchGetTransfersRequest {
  profile_id?: string;
  before?: string;
  after?: string;
  limit?: number;
  type?: string;
  currency_type?: string;
  transfer_reason?: string;
  currency?: string;
}

export interface SubmitCBExchTravelInformation {
  transfer_id: string;
  originator_name: string;
  originator_country: string;
}

export interface CBExchWithdrawToCBAccount {
  profile_id: string;
  amount: string;
  coinbase_account_id: string;
  currency: string;
}

export interface CBExchWithdrawToCryptoAddress {
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

export interface CBExchGetCryptoWithdrawalFeeEstimate {
  currency: string;
  crypto_address: string;
  network?: string;
}

export interface CBExchWithdrawToPaymentMethod {
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

export interface GetCBExchFillsRequest {
  order_id?: string;
  product_id?: string;
  limit?: number;
  before?: string;
  after?: string;
  market_type?: string;
  start_date?: string;
  end_date?: string;
}

export interface GetCBExchOrdersRequest {
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

export interface SubmitCBExchOrderRequest {
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

export interface CancelCBExchOrderRequest {
  order_id: string;
  profile_id?: string;
  product_id?: string;
}

/**
 *
 * Loans Endpoints
 *
 */

export interface SubmitCBExchNewLoan {
  loan_id: string;
  currency: string;
  native_amount: string;
  interest_rate: string;
  term_start_date: string;
  term_end_date: string;
  profile_id: string;
}

export interface RepayCBExchLoanInterest {
  idem: string;
  from_profile_id: string;
  currency: string;
  native_amount: string;
}

export interface RepayCBExchLoanPrincipal {
  loan_id: string;
  idem: string;
  from_profile_id: string;
  currency: string;
  native_amount: string;
}

export interface GetCBExchPrincipalRepaymentPreview {
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

export interface GetCBExchProductCandles {
  product_id: string;
  granularity: number;
  start?: string;
  end?: string;
}

export interface GetCBExchProductTrades {
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

export interface TransferCBExchFundsBetweenProfiles {
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

export interface GetAllCBExchReports {
  profile_id?: string;
  after?: string;
  limit?: number;
  type?: string;
  ignore_expired?: boolean;
}

export interface CreateCBExchReport {
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

export interface GetCBExchTravelRuleInformation {
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

export interface GetCBExchAllStakeWraps {
  before?: string;
  after?: string;
  limit?: number;
  from?: string;
  to?: string;
  status?: string;
}
