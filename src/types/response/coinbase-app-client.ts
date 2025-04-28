export interface CBAppPagination {
  ending_before?: string | null;
  starting_after?: string | null;
  limit?: number;
  order?: string;
  previous_uri: string | null;
  next_uri: string | null;
}

/**
 *
 * Account Endpoints
 *
 */

interface AccountCurrency {
  address_regex: string;
  asset_id: string;
  code: string;
  color: string;
  exponent: number;
  name: string;
  slug: string;
  sort_index: number;
  type: string;
}

interface AccountBalance {
  amount: string;
  currency: string;
}

export interface CBAppAccount {
  id: string;
  name: string;
  primary: boolean;
  type: string;
  currency: AccountCurrency;
  balance: AccountBalance;
  created_at: string;
  updated_at: string;
  resource: string;
  resource_path: string;
  ready: boolean;
}

/**
 *
 * Address Endpoints
 *
 */

export interface CBAppAddress {
  id: string;
  address: string;
  name?: string;
  network: string;
  created_at: string;
  updated_at: string;
  resource: string;
  resource_path: string;
}

/**
 *
 * Transactions Endpoints
 *
 */

interface TransactionAmount {
  amount: string;
  currency: string;
}

interface TransactionNetwork {
  status: string;
  name: string;
  hash?: string;
  transaction_fee?: TransactionAmount;
  transaction_amount?: TransactionAmount;
  network_name?: string;
  status_description?: string | null;
}

interface TransactionFrom {
  id: string;
  resource: string;
  resource_path?: string;
}

interface TransactionTo {
  resource: string;
  address?: string;
  email?: string;
  id?: string;
  resource_path?: string;
}

interface TransactionDetails {
  title: string;
  subtitle: string;
  header?: string;
  health?: string;
  subsidebar_label?: string | null;
}

interface AdvancedTradeFill {
  fill_price: string;
  product_id: string;
  order_id: string;
  commission: string;
  order_side: 'BUY' | 'SELL';
}

export interface CBAppTransaction {
  id: string;
  type: string;
  status: string;
  amount: TransactionAmount;
  native_amount: TransactionAmount;
  description: string | null;
  created_at: string;
  updated_at: string;
  resource: string;
  resource_path: string;
  network?: TransactionNetwork;
  from?: TransactionFrom;
  to?: TransactionTo;
  details?: TransactionDetails;
  instant_exchange?: boolean;
  advanced_trade_fill?: AdvancedTradeFill;
  cancelable?: boolean;
  idem?: string;
}

/**
 *
 * Deposits/Withdrawal Endpoints
 *
 */

interface DepositWithdrawalPaymentMethod {
  id: string;
  resource: string;
  resource_path: string;
}

interface DepositWithdrawalTransaction {
  id: string;
  resource: string;
  resource_path: string;
}

interface DepositWithdrawalAmountCurrency {
  amount: string;
  currency: string;
}

export interface CBAppDepositWithdrawal {
  id: string;
  status: string;
  payment_method: DepositWithdrawalPaymentMethod;
  transaction: DepositWithdrawalTransaction;
  amount: DepositWithdrawalAmountCurrency;
  subtotal: DepositWithdrawalAmountCurrency;
  created_at: string;
  updated_at: string;
  resource: string;
  resource_path: string;
  committed: boolean;
  fee: DepositWithdrawalAmountCurrency;
  payout_at: string;
}

interface TransferAmount {
  value: string;
  currency: string;
}

interface TransferOwner {
  id: string;
  uuid: string;
  user_uuid: string;
  type: string;
}

interface TransferLedgerAccount {
  account_id: string;
  currency: string;
  owner: TransferOwner;
}

interface TransferExternalPaymentMethod {
  payment_method_id: string;
}

interface TransferSource {
  type: string;
  network: string;
  payment_method_id: string;
  external_payment_method: TransferExternalPaymentMethod;
}

interface TransferTarget {
  type: string;
  network: string;
  payment_method_id: string;
  ledger_account: TransferLedgerAccount;
}

interface TransferFee {
  title: string;
  description: string;
  amount: TransferAmount;
  type: string;
}

export interface CBAppTransfer {
  user_entered_amount: TransferAmount;
  amount: TransferAmount;
  total: TransferAmount;
  subtotal: TransferAmount;
  idem: string;
  committed: boolean;
  id: string;
  instant: boolean;
  source: TransferSource;
  target: TransferTarget;
  payout_at: string;
  status: string;
  user_reference: string;
  type: string;
  created_at: string | null;
  updated_at: string | null;
  user_warnings: any[];
  fees: any[];
  total_fee: TransferFee;
  cancellation_reason: string | null;
  hold_days: number;
  nextStep: any | null;
  checkout_url: string;
  requires_completion_step: boolean;
}

export interface CBAppTransfer {
  transfer: CBAppTransfer;
}
/**
 *
 * DATA - Currencies Endpoints
 *
 */

export interface CBAppFiatCurrency {
  id: string;
  name: string;
  min_size: string;
}

export interface CBAppCryptocurrency {
  code: string;
  name: string;
  color: string;
  sort_index: number;
  exponent: number;
  type: string;
  address_regex: string;
  asset_id: string;
}

/**
 *
 * DATA- Exchange rates Endpoints
 *
 */

/**
 *
 * DATA - Prices Endpoints
 *
 */

/**
 *
 * DATA - Time Endpoints
 *
 */
