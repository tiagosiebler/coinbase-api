/**
 *
 * Accounts Endpoints
 *
 */

/**
 *
 * Address book Endpoints
 *
 */

export interface CBExchCounterpartyAddress {
  id: string;
  address: string;
  label: string;
  added_at: string;
}

export interface CBExchCurrencySupportedNetwork {
  id: string;
  name: string;
  status: string;
  contract_address?: string;
  crypto_address_link?: string;
  tx_link?: string;
  min_withdrawal_amount?: number;
  max_withdrawal_amount?: number;
  network_confirmations?: number;
  processing_time_seconds?: number;
  destination_tag_regex?: string;
  is_evm_network?: boolean;
}

/**
 *
 * Coinbase Account Endpoints
 *
 */

/**
 *
 * Conversions Endpoints
 *
 */

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

/**
 *
 * Loans Endpoints
 *
 */

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

/**
 *
 * Profiles Endpoints
 *
 */

/**
 *
 * Reports Endpoints
 *
 */

/**
 *
 * Travel Rule Endpoints
 *
 */

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
