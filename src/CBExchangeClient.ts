import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  CancelCBExchOrderRequest,
  CBExchDepositFromCoinbaseAccount,
  CBExchDepositFromPaymentMethod,
  CBExchGetCryptoWithdrawalFeeEstimate,
  CBExchGetTransfersRequest,
  CBExchWithdrawToCBAccount,
  CBExchWithdrawToCryptoAddress,
  CBExchWithdrawToPaymentMethod,
  ConvertCBExchCurrencyRequest,
  CreateCBExchNewCryptoAddress,
  CreateCBExchReport,
  GetAllCBExchReports,
  GetCBExchAccountHoldsRequest,
  GetCBExchAccountLedgerRequest,
  GetCBExchAccountTransfersRequest,
  GetCBExchAddressBookRequest,
  GetCBExchAllStakeWraps,
  GetCBExchFillsRequest,
  GetCBExchOrdersRequest,
  GetCBExchPrincipalRepaymentPreview,
  GetCBExchProductCandles,
  GetCBExchProductTrades,
  GetCBExchTravelRuleInformation,
  RepayCBExchLoanInterest,
  RepayCBExchLoanPrincipal,
  SubmitCBExchNewLoan,
  SubmitCBExchOrderRequest,
  SubmitCBExchTravelInformation,
  TransferCBExchFundsBetweenProfiles,
} from './types/request/coinbase-exchange.js';

/**
 * REST client for Coinbase's Institutional Exchange API:
 * https://docs.cdp.coinbase.com/exchange/docs/welcome
 */
export class CBExchangeClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.exchange;
  }

  /**
   *
   * Accounts Endpoints
   *
   */

  /**
   * Get all accounts for a profile
   *
   * Get a list of trading accounts from the profile of the API key.
   * Your trading accounts are separate from your Coinbase accounts. See Deposit from Coinbase account for documentation on how to deposit funds to begin trading.
   */
  getAccounts(): Promise<any> {
    return this.getPrivate('/accounts');
  }

  /**
   * Get a single account by id
   *
   * Information for a single account. Use this endpoint when you know the account_id. API key must belong to the same profile as the account.
   */
  getAccount(params: { account_id: string }): Promise<any> {
    return this.getPrivate(`/accounts/${params.account_id}`);
  }

  /**
   * Get a single account's holds
   *
   * List the holds of an account that belong to the same profile as the API key. Holds are placed on an account for any active orders or
   * pending withdraw requests. As an order is filled, the hold amount is updated.
   * If an order is canceled, any remaining hold is removed. For withdrawals, the hold is removed after it is completed.
   */
  getAccountHolds(params: GetCBExchAccountHoldsRequest): Promise<any> {
    const { account_id, ...query } = params;
    return this.getPrivate(`/accounts/${account_id}/holds`, query);
  }

  /**
   * Get a single account's ledger
   *
   * Lists ledger activity for an account. This includes anything that would affect the account's balance - transfers, trades, fees, etc.
   * If neither start_date nor end_date is set, the endpoint will return ledger activity for the past 1 day only.
   * List account activity of the API key's profile. Account activity either increases or decreases your account balance.
   *
   * Entry Types:
   * - transfer: Funds moved to/from Coinbase to Coinbase Exchange
   * - match: Funds moved as a result of a trade
   * - fee: Fee as a result of a trade
   * - rebate: Fee rebate as per our fee schedule
   * - conversion: Funds converted between fiat currency and a stablecoin
   */
  getAccountLedger(params: GetCBExchAccountLedgerRequest): Promise<any> {
    const { account_id, ...query } = params;
    return this.getPrivate(`/accounts/${account_id}/ledger`, query);
  }

  /**
   * Get a single account's transfers
   *
   * Lists past withdrawals and deposits for an account.
   */
  getAccountTransfers(params: GetCBExchAccountTransfersRequest): Promise<any> {
    const { account_id, ...query } = params;
    return this.getPrivate(`/accounts/${account_id}/transfers`, query);
  }

  /**
   *
   * Address book Endpoints
   *
   */

  /**
   * Get address book
   *
   * Get all addresses stored in the address book.
   */
  getAddressBook(): Promise<any> {
    return this.getPrivate('/address-book');
  }

  /**
   * Add addresses
   *
   * Add new addresses to address book.
   */
  addAddresses(params: GetCBExchAddressBookRequest): Promise<any> {
    return this.postPrivate('/address-book', { body: params });
  }

  /**
   * Delete address
   *
   * Delete address from address book.
   */
  deleteAddress(params: { id: string }): Promise<any> {
    return this.deletePrivate(`/address-book/${params.id}`);
  }

  /**
   *
   * Coinbase Accounts Endpoints
   *
   */

  /**
   * Get all Coinbase wallets
   *
   * Gets all the user's available Coinbase wallets. These are the wallets/accounts that are used for buying and selling on www.coinbase.com.
   */
  getCoinbaseWallets(): Promise<any> {
    return this.getPrivate('/coinbase-accounts');
  }

  /**
   * Generate crypto address
   *
   * Generates a one-time crypto address for depositing crypto.
   */
  createNewCryptoAddress(params: CreateCBExchNewCryptoAddress): Promise<any> {
    const { account_id, ...body } = params;
    return this.postPrivate(`/coinbase-accounts/${account_id}/addresses`, {
      body: body,
    });
  }

  /**
   *
   * Conversions Endpoints
   *
   */

  /**
   * Convert currency
   *
   * Converts funds from one currency to another. Funds are converted on the from account in the profile_id profile.
   */
  convertCurrency(params: ConvertCBExchCurrencyRequest): Promise<any> {
    return this.postPrivate('/conversions', { body: params });
  }

  /**
   * Get conversion fee rates
   *
   * Gets a list of current conversion fee rates and trailing 30 day volume by currency pair.
   */
  getConversionFeeRates(): Promise<any> {
    return this.getPrivate('/conversions/fees');
  }

  /**
   * Get a conversion
   *
   * Gets a currency conversion by id (i.e. USD -> USDC).
   */
  getConversion(params: {
    conversion_id: string;
    profile_id?: string;
  }): Promise<any> {
    const { conversion_id, ...query } = params;
    return this.getPrivate(`/conversions/${conversion_id}`, query);
  }

  /**
   * Get all conversions
   *
   * Get all conversions associated with the profile tied to the API key used to make the request.
   */
  getAllConversions(params: {
    profile_id: string;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate('/conversions', params);
  }

  /**
   *
   * Currencies Endpoints
   *
   */

  /**
   * Get all known currencies
   *
   * Gets a list of all known currencies. Note: Not all currencies may be currently in use for trading.
   */
  getCurrencies(): Promise<any> {
    return this.get('/currencies');
  }

  /**
   * Get a currency
   *
   * Gets a single currency by id.
   */
  getCurrency(currency_id: string): Promise<any> {
    return this.get(`/currencies/${currency_id}`);
  }

  /**
   *
   * Transfers Endpoints
   *
   */

  /**
   * Deposit from Coinbase account
   *
   * Deposits funds from a www.coinbase.com wallet to the specified profile_id.
   */
  depositFromCoinbaseAccount(
    params: CBExchDepositFromCoinbaseAccount,
  ): Promise<any> {
    return this.postPrivate('/deposits/coinbase-account', {
      body: params,
    });
  }

  /**
   * Deposit from payment method
   *
   * Deposits funds from a linked external payment method to the specified profile_id.
   * See Get all payment methods. The SEPA payment method is not allowed for depositing funds because it is a push payment method.
   */
  depositFromPaymentMethod(
    params: CBExchDepositFromPaymentMethod,
  ): Promise<any> {
    return this.postPrivate('/deposits/payment-method', { body: params });
  }

  /**
   * Get all payment methods
   *
   * Gets a list of the user's linked payment methods.
   */
  getPaymentMethods(): Promise<any> {
    return this.getPrivate('/payment-methods');
  }

  /**
   * Get all transfers
   *
   * Gets a list of in-progress and completed transfers of funds in/out of any of the user's accounts.
   */
  getTransfers(params?: CBExchGetTransfersRequest): Promise<any> {
    return this.getPrivate('/transfers', params);
  }

  /**
   * Get a single transfer
   *
   * Get information on a single transfer.
   */
  getTransfer(params: { transfer_id: string }): Promise<any> {
    return this.getPrivate(`/transfers/${params.transfer_id}`);
  }

  /**
   * Submit travel information for a transfer
   *
   * Submit travel information for a transfer.
   */
  submitTravelInformation(params: SubmitCBExchTravelInformation): Promise<any> {
    const { transfer_id, ...body } = params;
    return this.postPrivate(`/transfers/${transfer_id}/travel-rules`, {
      body: body,
    });
  }

  /**
   * Withdraw to Coinbase account
   *
   * Withdraws funds from the specified profile_id to a www.coinbase.com wallet.
   * You can move funds between your Coinbase accounts and your Coinbase Exchange trading accounts within your daily limits. Moving funds between Coinbase and Coinbase Exchange is instant and free.
   * See the Coinbase Accounts section for retrieving your Coinbase accounts.
   */
  withdrawToCoinbaseAccount(params: CBExchWithdrawToCBAccount): Promise<any> {
    return this.postPrivate('/withdrawals/coinbase-account', { body: params });
  }

  /**
   * Withdraw to crypto address
   *
   * Withdraws funds from the specified profile_id to an external crypto address.
   */
  withdrawToCryptoAddress(params: CBExchWithdrawToCryptoAddress): Promise<any> {
    return this.postPrivate('/withdrawals/crypto', { body: params });
  }

  /**
   * Get fee estimate for crypto withdrawal
   *
   * Gets the fee estimate for the crypto withdrawal to a crypto address.
   */
  getCryptoWithdrawalFeeEstimate(
    params: CBExchGetCryptoWithdrawalFeeEstimate,
  ): Promise<any> {
    return this.getPrivate('/withdrawals/fee-estimate', params);
  }

  /**
   * Withdraw to payment method
   *
   * Withdraws funds from the specified profile_id to a linked external payment method.
   * See the Payment Methods section for retrieving your payment methods.
   */
  withdrawToPaymentMethod(params: CBExchWithdrawToPaymentMethod): Promise<any> {
    return this.postPrivate('/withdrawals/payment-method', { body: params });
  }

  /**
   *
   * Fees Endpoints
   *
   */

  /**
   * Get fees
   *
   * Get fee rates and 30 days trailing volume.
   * This request returns your current maker & taker fee rates, as well as your 30-day trailing volume. Quoted rates are subject to change.
   */
  getFees(): Promise<any> {
    return this.getPrivate('/fees');
  }

  /**
   *
   * Orders Endpoints
   *
   */

  /**
   * Get all fills
   *
   * Get a list of recent fills of the API key's profile. A fill is a partial or complete match on a specific order.
   */
  getFills(params?: GetCBExchFillsRequest): Promise<any> {
    return this.getPrivate('/fills', params);
  }

  /**
   * Get all orders
   *
   * List your current open orders. Only open or un-settled orders are returned by default. As soon as an order is no longer open and settled, it will no longer appear in the default request.
   * Open orders may change state between the request and the response depending on market conditions.
   */
  getOrders(params?: GetCBExchOrdersRequest): Promise<any> {
    return this.getPrivate('/orders', params);
  }

  /**
   * Cancel all orders
   *
   * With best effort, cancel all open orders. This may require you to make the request multiple times until all of the open orders are deleted.
   */
  cancelAllOrders(params?: {
    profile_id?: string;
    product_id?: string;
  }): Promise<any> {
    return this.deletePrivate('/orders', { query: params });
  }

  /**
   * Create a new order
   *
   * Create an order. You can place two types of orders: limit and market. Orders can only be placed if your account has sufficient funds.
   * Once an order is placed, your account funds will be put on hold for the duration of the order.
   */
  submitOrder(params: SubmitCBExchOrderRequest): Promise<any> {
    this.validateOrderId(params, 'client_oid');
    return this.postPrivate('/orders', { body: params });
  }

  /**
   * Get single order
   *
   * Get a single order by id.
   */
  getOrder(params: { order_id: string; market_type?: string }): Promise<any> {
    const { order_id, ...otherParams } = params;
    return this.getPrivate(`/orders/${order_id}`, otherParams);
  }

  /**
   * Cancel an order
   *
   * Cancel a single open order by id.
   */
  cancelOrder(params: CancelCBExchOrderRequest): Promise<any> {
    const { order_id, ...otherParams } = params;
    return this.deletePrivate(`/orders/${order_id}`, {
      body: otherParams,
    });
  }

  /**
   *
   * Loans Endpoints
   *
   */

  /**
   * List loans
   *
   * Accepts zero or more loan IDs as input. If no loan IDs are specified, it returns all loans for the user. Otherwise, it returns only the loan IDs specified.
   */
  getLoans(params?: { ids?: string }): Promise<any> {
    return this.getPrivate('/loans', params);
  }

  /**
   * List loan assets
   *
   * Get a list of lendable assets, a map of assets we accept as collateral for loans, and the haircut weight.
   */
  getLoanAssets(): Promise<any> {
    return this.getPrivate('/loans/assets');
  }

  /**
   * List interest summaries
   *
   * List summaries of interest owed by asset.
   */
  getInterestSummaries(): Promise<any> {
    return this.getPrivate('/loans/interest');
  }

  /**
   * List interest rate history
   *
   * List interest rate history for a loan.
   */
  getInterestRateHistory(params: { loan_id: string }): Promise<any> {
    return this.getPrivate(`/loans/interest/history/${params.loan_id}`);
  }

  /**
   * List interest charges
   *
   * List interest charges for a loan.
   */
  getInterestCharges(params: { loan_id: string }): Promise<any> {
    return this.getPrivate(`/loans/interest/${params.loan_id}`);
  }

  /**
   * Get lending overview
   *
   * This API summarizes lending for a given client. It calculates the overall loan balance, collateral level, and amounts available to borrow.
   * It also returns any withdrawal restrictions in force on the client.
   *
   * Get lending overview returns all amounts in USD notional values, except available_per_asset mappings which are returned in both notional and native values.
   */
  getLendingOverview(): Promise<any> {
    return this.getPrivate('/loans/lending-overview');
  }

  /**
   * Get new loan preview
   *
   * This API is similar to lending-overview but is used to preview the results of opening a new loan.
   * The values returned in the preview response take the existing loans, collateral and the potential change being previewed into account.
   * Note the preview request accepts native currency amounts as input.
   */
  getNewLoanPreview(params: {
    currency: string;
    native_amount: string;
  }): Promise<any> {
    return this.getPrivate('/loans/loan-preview', params);
  }

  /**
   * Open new loan
   *
   * This API triggers a loan open request. Funding is not necessarily instantaneous and there is no SLA.
   * You are notified when funds have settled in your Exchange account. Loan open requests, once initiated, cannot be canceled.
   */
  submitNewLoan(params: SubmitCBExchNewLoan): Promise<any> {
    return this.postPrivate('/loans/open', { body: params });
  }

  /**
   * List new loan options
   *
   * Get available currencies and interest rates for new loans. All amounts returned by this API are notional values (i.e., USD).
   */
  getNewLoanOptions(): Promise<any> {
    return this.getPrivate('/loans/options');
  }

  /**
   * Repay loan interest
   *
   * Submit an interest repayment for a loan.
   */
  repayLoanInterest(params: RepayCBExchLoanInterest): Promise<any> {
    return this.postPrivate('/loans/repay-interest', { body: params });
  }

  /**
   * Repay loan principal
   *
   * Submit a principal repayment for a loan.
   */
  repayLoanPrincipal(params: RepayCBExchLoanPrincipal): Promise<any> {
    return this.postPrivate('/loans/repay-principal', { body: params });
  }

  /**
   * Get principal repayment preview
   *
   * Preview the results of a loan principal repayment.
   * Like the Get lending overview API, all values are notional except available_per_asset which returns both notional and native values per currency.
   */
  getPrincipalRepaymentPreview(
    params: GetCBExchPrincipalRepaymentPreview,
  ): Promise<any> {
    return this.getPrivate('/loans/repayment-preview', params);
  }

  /**
   *
   * Coinbase Price Oracle Endpoints
   *
   */

  /**
   * Get signed prices
   *
   * Get cryptographically signed prices ready to be posted on-chain using Compound's Open Oracle smart contract.
   */
  getSignedPrices(): Promise<any> {
    return this.getPrivate('/oracle');
  }

  /**
   *
   * Products Endpoints
   *
   */

  /**
   * Get all known trading pairs
   *
   * Gets a list of available currency pairs for trading.
   */
  getAllTradingPairs(params?: { type?: string }): Promise<any> {
    return this.get('/products', params);
  }

  /**
   * Get all product volume
   *
   * Gets 30-day and 24-hour volume for all products and market types.
   */
  getAllProductVolume(): Promise<any> {
    return this.get('/products/volume-summary');
  }

  /**
   * Get single product
   *
   * Get information on a single product.
   */
  getProduct(params: { product_id: string }): Promise<any> {
    return this.get(`/products/${params.product_id}`);
  }

  /**
   * Get product book
   *
   * Get a list of open orders for a product. The amount of detail shown can be customized with the level parameter.
   * By default, only the inside (i.e., the best) bid and ask are returned. This is equivalent to a book depth of 1 level.
   * To see a larger order book, specify the level query parameter.
   */
  getProductBook(params: { product_id: string; level?: number }): Promise<any> {
    const { product_id, ...query } = params;
    return this.get(`/products/${product_id}/book`, query);
  }

  /**
   * Get product candles
   *
   * Historic rates for a product. Rates are returned in grouped buckets.
   * Candle schema is of the form [timestamp, price_low, price_high, price_open, price_close].
   */
  getProductCandles(params: GetCBExchProductCandles): Promise<any> {
    const { product_id, ...query } = params;
    return this.get(`/products/${product_id}/candles`, query);
  }

  /**
   * Get product stats
   *
   * Gets 30-day and 24-hour stats for a product.
   */
  getProductStats(params: { product_id: string }): Promise<any> {
    return this.get(`/products/${params.product_id}/stats`);
  }

  /**
   * Get product ticker
   *
   * Gets snapshot information about the last trade (tick), best bid/ask, and 24h volume.
   */
  getProductTicker(params: { product_id: string }): Promise<any> {
    return this.get(`/products/${params.product_id}/ticker`);
  }

  /**
   * Get product trades
   *
   * Gets a list of the latest trades for a product.
   */
  getProductTrades(params: GetCBExchProductTrades): Promise<any> {
    const { product_id, ...query } = params;
    return this.get(`/products/${product_id}/trades`, query);
  }

  /**
   *
   * Profiles Endpoints
   *
   */

  /**
   * Get profiles
   *
   * Gets a list of all of the current user's profiles.
   */
  getProfiles(params?: { active?: boolean }): Promise<any> {
    return this.getPrivate('/profiles', params);
  }

  /**
   * Create a profile
   *
   * Create a new profile. Will fail if no name is provided or if user already has max number of profiles.
   */
  createProfile(params: { name: string }): Promise<any> {
    return this.postPrivate('/profiles', { body: params });
  }

  /**
   * Transfer funds between profiles
   *
   * Transfer an amount of currency from one profile to another.
   */
  transferFundsBetweenProfiles(
    params: TransferCBExchFundsBetweenProfiles,
  ): Promise<any> {
    return this.postPrivate('/profiles/transfer', { body: params });
  }

  /**
   * Get profile by id
   *
   * Information for a single profile. Use this endpoint when you know the profile_id.
   */
  getProfileById(params: {
    profile_id: string;
    active?: boolean;
  }): Promise<any> {
    const { profile_id, ...query } = params;
    return this.getPrivate(`/profiles/${profile_id}`, query);
  }

  /**
   * Rename a profile
   *
   * Rename a profile. Names 'default' and 'margin' are reserved.
   */
  renameProfile(params: { profile_id: string; name: string }): Promise<any> {
    const { profile_id, ...body } = params;
    return this.putPrivate(`/profiles/${profile_id}`, { body: body });
  }

  /**
   * Delete a profile
   *
   * Deletes the profile specified by profile_id and transfers all funds to the profile specified by to.
   * Fails if there are any open orders on the profile to be deleted.
   */
  deleteProfile(params: { profile_id: string; to: string }): Promise<any> {
    const { profile_id, ...body } = params;
    return this.putPrivate(`/profiles/${profile_id}/deactivate`, {
      body: body,
    });
  }

  /**
   *
   * Reports Endpoints
   *
   */

  /**
   * Get all reports
   *
   * Gets a list of all user-generated reports.
   */
  getAllReports(params?: GetAllCBExchReports): Promise<any> {
    return this.getPrivate('/reports', params);
  }

  /**
   * Create a report
   *
   * Generates a report. You can create reports with historical data for all report types.
   * Balance reports can be snapshots of historical or current data.
   */
  createReport(params: CreateCBExchReport): Promise<any> {
    return this.postPrivate('/reports', { body: params });
  }

  /**
   * Get a report
   *
   * Get a specific report by report_id.
   */
  getReport(params: { report_id: string }): Promise<any> {
    return this.getPrivate(`/reports/${params.report_id}`);
  }

  /**
   *
   * Travel Rule Endpoints
   *
   */

  /**
   * Get all travel rule information
   *
   * Return a list of all stored travel rule information.
   */
  getTravelRuleInformation(
    params?: GetCBExchTravelRuleInformation,
  ): Promise<any> {
    return this.getPrivate('/travel-rules', params);
  }

  /**
   * Create travel rule entry
   *
   * Create travel rule entry for sending address.
   */
  createTravelRuleEntry(params: {
    address: string;
    originator_name: string;
    originator_country: string;
  }): Promise<any> {
    return this.postPrivate('/travel-rules', { body: params });
  }

  /**
   * Delete existing travel rule entry
   *
   * Delete existing travel rule entry.
   */
  deleteTravelRuleEntry(params: { id: string }): Promise<any> {
    return this.deletePrivate(`/travel-rules/${params.id}`);
  }

  /**
   *
   * Users Endpoints
   *
   */

  /**
   * Get user exchange limits
   *
   * Gets exchange limits information for a single user.
   */
  getUserExchangeLimits(params: { user_id: string }): Promise<any> {
    return this.getPrivate(`/users/${params.user_id}/exchange-limits`);
  }

  /**
   * Update settlement preference
   *
   * Updates the settlement preference to hold funds in either USDC or USD.
   */
  updateSettlementPreference(params: {
    user_id: string;
    settlement_preference: string;
  }): Promise<any> {
    const { user_id, ...body } = params;
    return this.postPrivate(`/users/${user_id}/settlement-preferences`, {
      body: body,
    });
  }

  /**
   * Get user trading volume
   *
   * Gets aggregated and individual trading volumes for users.
   */
  getUserTradingVolume(params: { user_id: string }): Promise<any> {
    return this.getPrivate(`/users/${params.user_id}/trading-volumes`);
  }

  /**
   *
   * Wrapped Assets Endpoints
   *
   */

  /**
   * Get all wrapped assets
   *
   * Returns a list of all supported wrapped assets details objects.
   */
  getAllWrappedAssets(): Promise<any> {
    return this.get('/wrapped-assets');
  }

  /**
   * Get all stake-wraps
   *
   * Get details for all stake-wraps in the profile associated with the API key.
   */
  getAllStakeWraps(params?: GetCBExchAllStakeWraps): Promise<any> {
    return this.getPrivate('/wrapped-assets/stake-wrap', params);
  }

  /**
   * Create a new stake-wrap
   *
   * Stakes and wraps from_currency to to_currency. Funds are stake-wrapped in the profile associated with the API key.
   */
  createStakeWrap(params: {
    from_currency: string;
    to_currency: string;
    amount: string;
  }): Promise<any> {
    return this.postPrivate('/wrapped-assets/stake-wrap', { body: params });
  }

  /**
   * Get a single stake-wrap
   *
   * Get details for a specific stake-wrap in the profile associated with the API key.
   */
  getStakeWrap(params: { stake_wrap_id: string }): Promise<any> {
    return this.getPrivate(
      `/wrapped-assets/stake-wrap/${params.stake_wrap_id}`,
    );
  }

  /**
   * Get wrapped asset details
   *
   * Returns the circulating and total supply of a wrapped asset, and its conversion rate.
   */
  getWrappedAssetDetails(params: { wrapped_asset_id: string }): Promise<any> {
    return this.getPrivate(`/wrapped-assets/${params.wrapped_asset_id}`);
  }

  /**
   * Get wrapped asset conversion rate
   *
   * Returns the conversion rate of a wrapped asset.
   */
  getWrappedAssetConversionRate(params: {
    wrapped_asset_id: string;
  }): Promise<any> {
    return this.getPrivate(
      `/wrapped-assets/${params.wrapped_asset_id}/conversion-rate`,
    );
  }
}
