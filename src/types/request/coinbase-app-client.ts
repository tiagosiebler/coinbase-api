/**
 *
 * Account Endpoints
 *
 */

/**
 *
 * Address Endpoints
 *
 */

/**
 *
 * Transactions Endpoints
 *
 */

export interface SendMoneyRequest {
  accountId: string;
  type: 'send';
  to: string;
  amount: string;
  currency: string;
  description?: string;
  skip_notifications?: boolean;
  idem?: string;
  to_financial_institution?: boolean;
  financial_institution_website?: string;
  destination_tag?: string;
}

export interface TransferMoneyRequest {
  accountId: string;
  type: 'transfer';
  to: string;
  amount: string;
  currency: string;
  description?: string;
}
/**
 *
 * Deposits Endpoints
 *
 */

export interface DepositFundsRequest {
  accountId: string;
  amount: string;
  currency: string;
  payment_method: string;
  commit?: boolean;
}

/**
 *
 * Withdrawals Endpoints
 *
 */

export interface WithdrawFundsRequest {
  accountId: string;
  amount: string;
  currency: string;
  payment_method: string;
  commit?: boolean;
}
