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
}

interface TransactionFrom {
  id: string;
  resource: string;
}

interface TransactionTo {
  resource: string;
  address: string;
}

interface TransactionDetails {
  title: string;
  subtitle: string;
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
  network: TransactionNetwork;
  from?: TransactionFrom;
  to?: TransactionTo;
  details?: TransactionDetails;
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
