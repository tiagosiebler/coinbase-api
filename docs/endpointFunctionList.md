
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/coinbase-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/coinbase-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/coinbase-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

Each REST client is a JavaScript class, which provides functions individually mapped to each endpoint available in the exchange's API offering. 

The following table shows all methods available in each REST client, whether the method requires authentication (automatically handled if API keys are provided), as well as the exact endpoint each method is connected to.

This can be used to easily find which method to call, once you have [found which endpoint you're looking to use](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).

All REST clients are in the [src](/src) folder. For usage examples, make sure to check the [examples](/examples) folder.

List of clients:
- [CBAdvancedTradeClient](#CBAdvancedTradeClientts)
- [CBAppClient](#CBAppClientts)
- [CBExchangeClient](#CBExchangeClientts)
- [CBInternationalClient](#CBInternationalClientts)
- [CBPrimeClient](#CBPrimeClientts)
- [CBCommerceClient](#CBCommerceClientts)


If anything is missing or wrong, please open an issue or let us know in our [Node.js Traders](https://t.me/nodetraders) telegram group!

## How to use table

Table consists of 4 parts:

- Function name
- AUTH
- HTTP Method
- Endpoint

**Function name** is the name of the function that can be called through the SDK. Check examples folder in the repo for more help on how to use them!

**AUTH** is a boolean value that indicates if the function requires authentication - which means you need to pass your API key and secret to the SDK.

**HTTP Method** shows HTTP method that the function uses to call the endpoint. Sometimes endpoints can have same URL, but different HTTP method so you can use this column to differentiate between them.

**Endpoint** is the URL that the function uses to call the endpoint. Best way to find exact function you need for the endpoint is to search for URL in this table and find corresponding function name.


# CBAdvancedTradeClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBAdvancedTradeClient.ts](/src/CBAdvancedTradeClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `getAccounts()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/accounts` |
| `getAccount()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/accounts/{account_id}` |
| `getBestBidAsk()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/best_bid_ask` |
| `getProductBook()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/product_book` |
| `getProducts()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products` |
| `getProduct()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}` |
| `getProductCandles()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}/candles` |
| `getMarketTrades()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}/ticker` |
| `submitOrder()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders` |
| `cancelOrders()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/batch_cancel` |
| `updateOrder()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/edit` |
| `updateOrderPreview()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/edit_preview` |
| `getOrders()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/batch` |
| `getFills()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/fills` |
| `getOrder()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/{order_id}` |
| `previewOrder()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/preview` |
| `closePosition()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/close_position` |
| `getPortfolios()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/portfolios` |
| `createPortfolio()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/portfolios` |
| `movePortfolioFunds()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/portfolios/move_funds` |
| `getPortfolioBreakdown()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| `deletePortfolio()` | :closed_lock_with_key:  | DELETE | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| `updatePortfolio()` | :closed_lock_with_key:  | PUT | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| `getFuturesBalanceSummary()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/balance_summary` |
| `getIntradayMarginSetting()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/intraday/margin_setting` |
| `setIntradayMarginSetting()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/cfm/intraday/margin_setting` |
| `getCurrentMarginWindow()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/intraday/current_margin_window` |
| `getFuturesPositions()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/positions` |
| `getFuturesPosition()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/positions/{product_id}` |
| `scheduleFuturesSweep()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/cfm/sweeps/schedule` |
| `getFuturesSweeps()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/sweeps` |
| `cancelPendingFuturesSweep()` | :closed_lock_with_key:  | DELETE | `/api/v3/brokerage/cfm/sweeps` |
| `allocatePortfolio()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/intx/allocate` |
| `getPerpetualsPortfolioSummary()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/portfolio/{portfolio_uuid}` |
| `getPerpetualsPositions()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/positions/{portfolio_uuid}` |
| `getPerpetualsPosition()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/positions/{portfolio_uuid}/{symbol}` |
| `getPortfoliosBalances()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/balances/{portfolio_uuid}` |
| `updateMultiAssetCollateral()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/intx/multi_asset_collateral` |
| `getTransactionSummary()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/transaction_summary` |
| `submitConvertQuote()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/convert/quote` |
| `getConvertTrade()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/convert/trade/{trade_id}` |
| `commitConvertTrade()` | :closed_lock_with_key:  | POST | `/api/v3/brokerage/convert/trade/{trade_id}` |
| `getServerTime()` |  | GET | `/api/v3/brokerage/time` |
| `getPublicProductBook()` |  | GET | `/api/v3/brokerage/market/product_book` |
| `getPublicProducts()` |  | GET | `/api/v3/brokerage/market/products` |
| `getPublicProduct()` |  | GET | `/api/v3/brokerage/market/products/{product_id}` |
| `getPublicProductCandles()` |  | GET | `/api/v3/brokerage/market/products/{product_id}/candles` |
| `getPublicMarketTrades()` |  | GET | `/api/v3/brokerage/market/products/{product_id}/ticker` |
| `getPaymentMethods()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/payment_methods` |
| `getPaymentMethod()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/payment_methods/{payment_method_id}` |
| `getApiKeyPermissions()` | :closed_lock_with_key:  | GET | `/api/v3/brokerage/key_permissions` |

# CBAppClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBAppClient.ts](/src/CBAppClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `getAccounts()` | :closed_lock_with_key:  | GET | `/v2/accounts` |
| `getAccount()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}` |
| `createAddress()` | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/addresses` |
| `getAddresses()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses` |
| `getAddress()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses/{addressId}` |
| `getAddressTransactions()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses/{addressId}/transactions` |
| `sendMoney()` | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/transactions` |
| `transferMoney()` | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/transactions` |
| `getTransactions()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/transactions` |
| `getTransaction()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/transactions/{transactionId}` |
| `depositFunds()` | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/deposits` |
| `commitDeposit()` | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/deposits/{deposit_id}/commit` |
| `getDeposits()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/deposits` |
| `getDeposit()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/deposits/{deposit_id}` |
| `withdrawFunds()` | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/withdrawals` |
| `commitWithdrawal()` | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/withdrawals/{withdrawal_id}/commit` |
| `getWithdrawals()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/withdrawals` |
| `getWithdrawal()` | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/withdrawals/{withdrawal_id}` |
| `getFiatCurrencies()` |  | GET | `/v2/currencies` |
| `getCryptocurrencies()` |  | GET | `/v2/currencies/crypto` |
| `getExchangeRates()` |  | GET | `/v2/exchange-rates` |
| `getBuyPrice()` |  | GET | `/v2/prices/{currencyPair}/buy` |
| `getSellPrice()` |  | GET | `/v2/prices/{currencyPair}/sell` |
| `getSpotPrice()` |  | GET | `/v2/prices/{currencyPair}/spot` |
| `getCurrentTime()` |  | GET | `/v2/time` |

# CBExchangeClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBExchangeClient.ts](/src/CBExchangeClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `getAccounts()` | :closed_lock_with_key:  | GET | `/accounts` |
| `getAccount()` | :closed_lock_with_key:  | GET | `/accounts/{account_id}` |
| `getAccountHolds()` | :closed_lock_with_key:  | GET | `/accounts/{account_id}/holds` |
| `getAccountLedger()` | :closed_lock_with_key:  | GET | `/accounts/{account_id}/ledger` |
| `getAccountTransfers()` | :closed_lock_with_key:  | GET | `/accounts/{account_id}/transfers` |
| `getAddressBook()` | :closed_lock_with_key:  | GET | `/address-book` |
| `addAddresses()` | :closed_lock_with_key:  | POST | `/address-book` |
| `deleteAddress()` | :closed_lock_with_key:  | DELETE | `/address-book/{id}` |
| `getCoinbaseWallets()` | :closed_lock_with_key:  | GET | `/coinbase-accounts` |
| `createNewCryptoAddress()` | :closed_lock_with_key:  | POST | `/coinbase-accounts/{account_id}/addresses` |
| `convertCurrency()` | :closed_lock_with_key:  | POST | `/conversions` |
| `getConversionFeeRates()` | :closed_lock_with_key:  | GET | `/conversions/fees` |
| `getConversion()` | :closed_lock_with_key:  | GET | `/conversions/{conversion_id}` |
| `getCurrencies()` |  | GET | `/currencies` |
| `getCurrency()` |  | GET | `/currencies/{currency_id}` |
| `depositFromCoinbaseAccount()` | :closed_lock_with_key:  | POST | `/deposits/coinbase-account` |
| `depositFromPaymentMethod()` | :closed_lock_with_key:  | POST | `/deposits/payment-method` |
| `getPaymentMethods()` | :closed_lock_with_key:  | GET | `/payment-methods` |
| `getTransfers()` | :closed_lock_with_key:  | GET | `/transfers` |
| `getTransfer()` | :closed_lock_with_key:  | GET | `/transfers/{transfer_id}` |
| `submitTravelInformation()` | :closed_lock_with_key:  | POST | `/transfers/{transfer_id}/travel-rules` |
| `withdrawToCoinbaseAccount()` | :closed_lock_with_key:  | POST | `/withdrawals/coinbase-account` |
| `withdrawToCryptoAddress()` | :closed_lock_with_key:  | POST | `/withdrawals/crypto` |
| `getCryptoWithdrawalFeeEstimate()` | :closed_lock_with_key:  | GET | `/withdrawals/fee-estimate` |
| `withdrawToPaymentMethod()` | :closed_lock_with_key:  | POST | `/withdrawals/payment-method` |
| `getFees()` | :closed_lock_with_key:  | GET | `/fees` |
| `getFills()` | :closed_lock_with_key:  | GET | `/fills` |
| `getOrders()` | :closed_lock_with_key:  | GET | `/orders` |
| `cancelAllOrders()` | :closed_lock_with_key:  | DELETE | `/orders` |
| `submitOrder()` | :closed_lock_with_key:  | POST | `/orders` |
| `getOrder()` | :closed_lock_with_key:  | GET | `/orders/{order_id}` |
| `cancelOrder()` | :closed_lock_with_key:  | DELETE | `/orders/{order_id}` |
| `getLoans()` | :closed_lock_with_key:  | GET | `/loans` |
| `getLoanAssets()` | :closed_lock_with_key:  | GET | `/loans/assets` |
| `getInterestSummaries()` | :closed_lock_with_key:  | GET | `/loans/interest` |
| `getInterestRateHistory()` | :closed_lock_with_key:  | GET | `/loans/interest/history/{loan_id}` |
| `getInterestCharges()` | :closed_lock_with_key:  | GET | `/loans/interest/{loan_id}` |
| `getLendingOverview()` | :closed_lock_with_key:  | GET | `/loans/lending-overview` |
| `getNewLoanPreview()` | :closed_lock_with_key:  | GET | `/loans/loan-preview` |
| `submitNewLoan()` | :closed_lock_with_key:  | POST | `/loans/open` |
| `getNewLoanOptions()` | :closed_lock_with_key:  | GET | `/loans/options` |
| `repayLoanInterest()` | :closed_lock_with_key:  | POST | `/loans/repay-interest` |
| `repayLoanPrincipal()` | :closed_lock_with_key:  | POST | `/loans/repay-principal` |
| `getPrincipalRepaymentPreview()` | :closed_lock_with_key:  | GET | `/loans/repayment-preview` |
| `getSignedPrices()` | :closed_lock_with_key:  | GET | `/oracle` |
| `getAllTradingPairs()` |  | GET | `/products` |
| `getAllProductVolume()` |  | GET | `/products/volume-summary` |
| `getProduct()` |  | GET | `/products/{product_id}` |
| `getProductBook()` |  | GET | `/products/{product_id}/book` |
| `getProductCandles()` |  | GET | `/products/{product_id}/candles` |
| `getProductStats()` |  | GET | `/products/{product_id}/stats` |
| `getProductTicker()` |  | GET | `/products/{product_id}/ticker` |
| `getProductTrades()` |  | GET | `/products/{product_id}/trades` |
| `getProfiles()` | :closed_lock_with_key:  | GET | `/profiles` |
| `createProfile()` | :closed_lock_with_key:  | POST | `/profiles` |
| `transferFundsBetweenProfiles()` | :closed_lock_with_key:  | POST | `/profiles/transfer` |
| `getProfileById()` | :closed_lock_with_key:  | GET | `/profiles/{profile_id}` |
| `renameProfile()` | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}` |
| `deleteProfile()` | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}/deactivate` |
| `getAllReports()` | :closed_lock_with_key:  | GET | `/reports` |
| `createReport()` | :closed_lock_with_key:  | POST | `/reports` |
| `getReport()` | :closed_lock_with_key:  | GET | `/reports/{report_id}` |
| `getTravelRuleInformation()` | :closed_lock_with_key:  | GET | `/travel-rules` |
| `createTravelRuleEntry()` | :closed_lock_with_key:  | POST | `/travel-rules` |
| `deleteTravelRuleEntry()` | :closed_lock_with_key:  | DELETE | `/travel-rules/{id}` |
| `getUserExchangeLimits()` | :closed_lock_with_key:  | GET | `/users/{user_id}/exchange-limits` |
| `updateSettlementPreference()` | :closed_lock_with_key:  | POST | `/users/{user_id}/settlement-preferences` |
| `getUserTradingVolume()` | :closed_lock_with_key:  | GET | `/users/{user_id}/trading-volumes` |
| `getAllWrappedAssets()` |  | GET | `/wrapped-assets` |
| `getAllStakeWraps()` | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap` |
| `createStakeWrap()` | :closed_lock_with_key:  | POST | `/wrapped-assets/stake-wrap` |
| `getStakeWrap()` | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap/{stake_wrap_id}` |
| `getWrappedAssetDetails()` | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}` |
| `getWrappedAssetConversionRate()` | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}/conversion-rate` |

# CBInternationalClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBInternationalClient.ts](/src/CBInternationalClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `getAssets()` |  | GET | `/api/v1/assets` |
| `getAssetDetails()` |  | GET | `/api/v1/assets/{asset}` |
| `getSupportedNetworksPerAsset()` |  | GET | `/api/v1/assets/{asset}/networks` |
| `getInstruments()` |  | GET | `/api/v1/instruments` |
| `getInstrumentDetails()` |  | GET | `/api/v1/instruments/{instrument}` |
| `getQuotePerInstrument()` |  | GET | `/api/v1/instruments/{instrument}/quote` |
| `getDailyTradingVolumes()` |  | GET | `/api/v1/instruments/volumes/daily` |
| `getAggregatedCandlesData()` |  | GET | `/api/v1/instruments/{instrument}/candles` |
| `getHistoricalFundingRates()` |  | GET | `/api/v1/instruments/{instrument}/funding` |
| `getPositionOffsets()` |  | GET | `/api/v1/position-offsets` |
| `submitOrder()` | :closed_lock_with_key:  | POST | `/api/v1/orders` |
| `getOpenOrders()` | :closed_lock_with_key:  | GET | `/api/v1/orders` |
| `cancelOrders()` | :closed_lock_with_key:  | DELETE | `/api/v1/orders` |
| `updateOpenOrder()` | :closed_lock_with_key:  | PUT | `/api/v1/orders/{id}` |
| `getOrderDetails()` | :closed_lock_with_key:  | GET | `/api/v1/orders/{id}` |
| `cancelOrder()` | :closed_lock_with_key:  | DELETE | `/api/v1/orders/{id}` |
| `getUserPortfolios()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios` |
| `createPortfolio()` | :closed_lock_with_key:  | POST | `/api/v1/portfolios` |
| `updatePortfolioParameters()` | :closed_lock_with_key:  | PATCH | `/api/v1/portfolios` |
| `getUserPortfolio()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}` |
| `updatePortfolio()` | :closed_lock_with_key:  | PUT | `/api/v1/portfolios/{portfolio}` |
| `getPortfolioDetails()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/detail` |
| `getPortfolioSummary()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/summary` |
| `getPortfolioBalances()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances` |
| `getBalanceForPortfolioAsset()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances/{asset}` |
| `getPortfolioPositions()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions` |
| `getPositionForPortfolioInstrument()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions/{instrument}` |
| `getFillsByPortfolios()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fills` |
| `getPortfolioFills()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/fills` |
| `setCrossCollateral()` | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/cross-collateral-enabled` |
| `setAutoMargin()` | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/auto-margin-enabled` |
| `setPortfolioMarginOverride()` | :closed_lock_with_key:  | POST | `/api/v1/portfolios/margin` |
| `transferFundsBetweenPortfolios()` | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer` |
| `transferPositionsBetweenPortfolios()` | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer-position` |
| `getPortfolioFeeRates()` | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fee-rates` |
| `getRankings()` | :closed_lock_with_key:  | GET | `/api/v1/rankings/statistics` |
| `getMatchingTransfers()` | :closed_lock_with_key:  | GET | `/api/v1/transfers` |
| `getTransfer()` | :closed_lock_with_key:  | GET | `/api/v1/transfers/{transfer_uuid}` |
| `withdrawToCryptoAddress()` | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw` |
| `createCryptoAddress()` | :closed_lock_with_key:  | POST | `/api/v1/transfers/address` |
| `createCounterpartyId()` | :closed_lock_with_key:  | POST | `/api/v1/transfers/create-counterparty-id` |
| `validateCounterpartyId()` | :closed_lock_with_key:  | POST | `/api/v1/transfers/validate-counterparty-id` |
| `withdrawToCounterpartyId()` | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw/counterparty` |
| `getFeeRateTiers()` | :closed_lock_with_key:  | GET | `/api/v1/fee-rate-tiers` |

# CBPrimeClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBPrimeClient.ts](/src/CBPrimeClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `createPortfolioAllocations()` | :closed_lock_with_key:  | POST | `/v1/allocations` |
| `createPortfolioNetAllocations()` | :closed_lock_with_key:  | POST | `/v1/allocations/net` |
| `getPortfolioAllocations()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations` |
| `getAllocationById()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/{allocation_id}` |
| `getNetAllocationsByNettingId()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/net/{netting_id}` |
| `getInvoices()` | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/invoices` |
| `getAssets()` | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/assets` |
| `getEntityPaymentMethods()` | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods` |
| `getEntityPaymentMethod()` | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods/{payment_method_id}` |
| `getUsers()` | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/users` |
| `getPortfolioUsers()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/users` |
| `getPortfolios()` | :closed_lock_with_key:  | GET | `/v1/portfolios` |
| `getPortfolioById()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}` |
| `getPortfolioCreditInformation()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/credit` |
| `getActivities()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities` |
| `getActivityById()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities/{activity_id}` |
| `getAddressBook()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/address_book` |
| `createAddressBookEntry()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/address_book` |
| `getPortfolioBalances()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/balances` |
| `getWalletBalance()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/balance` |
| `getWeb3WalletBalances()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/web3_balances` |
| `getPortfolioCommission()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/commission` |
| `getOpenOrders()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/open_orders` |
| `submitOrder()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order` |
| `getOrderPreview()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order_preview` |
| `getPortfolioOrders()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders` |
| `getOrderById()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}` |
| `cancelOrder()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/orders/{order_id}/cancel` |
| `getOrderFills()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}/fills` |
| `getPortfolioProducts()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/products` |
| `getPortfolioTransactions()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions` |
| `getTransactionById()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions/{transaction_id}` |
| `createConversion()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/conversion` |
| `getWalletTransactions()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transactions` |
| `createTransfer()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transfers` |
| `createWithdrawal()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/withdrawals` |
| `getPortfolioWallets()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets` |
| `createWallet()` | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets` |
| `getWalletById()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}` |
| `getWalletDepositInstructions()` | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/deposit_instructions` |

# CBCommerceClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBCommerceClient.ts](/src/CBCommerceClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `createCharge()` | :closed_lock_with_key:  | POST | `/charges` |
| `getAllCharges()` | :closed_lock_with_key:  | GET | `/charges` |
| `getCharge()` | :closed_lock_with_key:  | GET | `/charges/{charge_code_or_charge_id}` |
| `createCheckout()` | :closed_lock_with_key:  | POST | `/checkouts` |
| `getAllCheckouts()` | :closed_lock_with_key:  | GET | `/checkouts` |
| `getCheckout()` | :closed_lock_with_key:  | GET | `/checkouts/{checkout_id}` |
| `listEvents()` | :closed_lock_with_key:  | GET | `/events` |
| `showEvent()` | :closed_lock_with_key:  | GET | `/events/{event_id}` |