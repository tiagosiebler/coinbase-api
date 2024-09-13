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

export interface CBAppSendMoneyRequest {
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

export interface CBAppTransferMoneyRequest {
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

export interface CBAppDepositFundsRequest {
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

export interface CBAppWithdrawFundsRequest {
  accountId: string;
  amount: string;
  currency: string;
  payment_method: string;
  commit?: boolean;
}
