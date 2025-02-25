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

export interface CBAppBeneficiaryAddress {
  address1: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  country?: string; // ISO 3166-1 alpha-2 country code
  postal_code?: string;
}

export interface CBAppTravelRuleData {
  beneficiary_wallet_type: 'WALLET_TYPE_SELF_HOSTED' | 'WALLET_TYPE_EXCHANGE';
  is_self: 'IS_SELF_FALSE' | 'IS_SELF_TRUE';
  beneficiary_name: string;
  beneficiary_address: CBAppBeneficiaryAddress;
  beneficiary_financial_institution: string;
  transfer_purpose: string;
}

export interface CBAppSendMoneyRequest {
  account_id: string;
  type: 'send';
  to: string;
  amount: string;
  currency: string;
  description?: string;
  skip_notifications?: boolean;
  idem?: string;
  destination_tag?: string;
  network?: string;
  travel_rule_data?: CBAppTravelRuleData;
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
