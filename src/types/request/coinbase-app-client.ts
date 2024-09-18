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
  account_id: string;
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
  account_id: string;
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
  account_id: string;
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
  account_id: string;
  amount: string;
  currency: string;
  payment_method: string;
  commit?: boolean;
}

/**
 *
 * DATA - Currencies Endpoints
 *
 */

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
