
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
| [getAccounts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L148) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/accounts` |
| [getAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L162) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/accounts/{account_id}` |
| [getBestBidAsk()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L179) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/best_bid_ask` |
| [getProductBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L190) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/product_book` |
| [getProducts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L204) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products` |
| [getProduct()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L216) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}` |
| [getProductCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L232) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}/candles` |
| [getMarketTrades()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L247) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}/ticker` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L269) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders` |
| [cancelOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L286) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/batch_cancel` |
| [updateOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L303) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/edit` |
| [updateOrderPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L319) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/edit_preview` |
| [getOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L339) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/batch` |
| [getFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L354) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/fills` |
| [getOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L366) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/{order_id}` |
| [previewOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L384) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/preview` |
| [closePosition()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L398) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/close_position` |
| [getPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L418) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/portfolios` |
| [createPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L431) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/portfolios` |
| [movePortfolioFunds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L444) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/portfolios/move_funds` |
| [getPortfolioBreakdown()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L458) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| [deletePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L474) | :closed_lock_with_key:  | DELETE | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| [updatePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L485) | :closed_lock_with_key:  | PUT | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| [getFuturesBalanceSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L516) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/balance_summary` |
| [getIntradayMarginSetting()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L527) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/intraday/margin_setting` |
| [setIntradayMarginSetting()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L541) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/cfm/intraday/margin_setting` |
| [getCurrentMarginWindow()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L557) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/intraday/current_margin_window` |
| [getFuturesPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L574) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/positions` |
| [getFuturesPosition()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L583) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/positions/{product_id}` |
| [scheduleFuturesSweep()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L603) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/cfm/sweeps/schedule` |
| [getFuturesSweeps()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L621) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/sweeps` |
| [cancelPendingFuturesSweep()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L630) | :closed_lock_with_key:  | DELETE | `/api/v3/brokerage/cfm/sweeps` |
| [allocatePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L646) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/intx/allocate` |
| [getPerpetualsPortfolioSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L657) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/portfolio/{portfolio_uuid}` |
| [getPerpetualsPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L671) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/positions/{portfolio_uuid}` |
| [getPerpetualsPosition()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L686) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/positions/{portfolio_uuid}/{symbol}` |
| [getPortfoliosBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L701) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/balances/{portfolio_uuid}` |
| [updateMultiAssetCollateral()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L713) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/intx/multi_asset_collateral` |
| [getTransactionSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L733) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/transaction_summary` |
| [submitConvertQuote()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L751) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/convert/quote` |
| [getConvertTrade()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L762) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/convert/trade/{trade_id}` |
| [commitConvertTrade()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L779) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/convert/trade/{trade_id}` |
| [getPublicProductBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L809) |  | GET | `/api/v3/brokerage/market/product_book` |
| [getPublicProducts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L822) |  | GET | `/api/v3/brokerage/market/products` |
| [getPublicProduct()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L834) |  | GET | `/api/v3/brokerage/market/products/{product_id}` |
| [getPublicProductCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L846) |  | GET | `/api/v3/brokerage/market/products/{product_id}/candles` |
| [getPublicMarketTrades()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L861) |  | GET | `/api/v3/brokerage/market/products/{product_id}/ticker` |
| [getPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L882) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/payment_methods` |
| [getPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L893) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/payment_methods/{payment_method_id}` |
| [getApiKeyPermissions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L913) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/key_permissions` |

# CBAppClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBAppClient.ts](/src/CBAppClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getAccounts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L66) | :closed_lock_with_key:  | GET | `/v2/accounts` |
| [getAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L85) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}` |
| [createAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L102) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/addresses` |
| [getAddresses()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L118) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses` |
| [getAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L144) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses/{addressId}` |
| [getAddressTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L161) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses/{addressId}/transactions` |
| [sendMoney()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L197) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/transactions` |
| [transferMoney()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L212) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/transactions` |
| [getTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L229) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/transactions` |
| [getTransaction()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L255) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/transactions/{transactionId}` |
| [depositFunds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L277) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/deposits` |
| [commitDeposit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L289) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/deposits/{deposit_id}/commit` |
| [getDeposits()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L306) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/deposits` |
| [getDeposit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L326) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/deposits/{deposit_id}` |
| [withdrawFunds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L345) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/withdrawals` |
| [commitWithdrawal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L357) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/withdrawals/{withdrawal_id}/commit` |
| [getWithdrawals()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L374) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/withdrawals` |
| [getWithdrawal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L400) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/withdrawals/{withdrawal_id}` |
| [getFiatCurrencies()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L423) |  | GET | `/v2/currencies` |
| [getCryptocurrencies()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L434) |  | GET | `/v2/currencies/crypto` |
| [getExchangeRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L450) |  | GET | `/v2/exchange-rates` |
| [getBuyPrice()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L471) |  | GET | `/v2/prices/{currencyPair}/buy` |
| [getSellPrice()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L486) |  | GET | `/v2/prices/{currencyPair}/sell` |
| [getSpotPrice()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L501) |  | GET | `/v2/prices/{currencyPair}/spot` |
| [getCurrentTime()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L523) |  | GET | `/v2/time` |

# CBExchangeClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBExchangeClient.ts](/src/CBExchangeClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getAccounts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L70) | :closed_lock_with_key:  | GET | `/accounts` |
| [getAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L79) | :closed_lock_with_key:  | GET | `/accounts/{account_id}` |
| [getAccountHolds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L90) | :closed_lock_with_key:  | GET | `/accounts/{account_id}/holds` |
| [getAccountLedger()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L109) | :closed_lock_with_key:  | GET | `/accounts/{account_id}/ledger` |
| [getAccountTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L119) | :closed_lock_with_key:  | GET | `/accounts/{account_id}/transfers` |
| [getAddressBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L135) | :closed_lock_with_key:  | GET | `/address-book` |
| [addAddresses()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L144) | :closed_lock_with_key:  | POST | `/address-book` |
| [deleteAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L153) | :closed_lock_with_key:  | DELETE | `/address-book/{id}` |
| [getCoinbaseWallets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L168) | :closed_lock_with_key:  | GET | `/coinbase-accounts` |
| [createNewCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L177) | :closed_lock_with_key:  | POST | `/coinbase-accounts/{account_id}/addresses` |
| [convertCurrency()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L195) | :closed_lock_with_key:  | POST | `/conversions` |
| [getConversionFeeRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L204) | :closed_lock_with_key:  | GET | `/conversions/fees` |
| [getConversion()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L213) | :closed_lock_with_key:  | GET | `/conversions/{conversion_id}` |
| [getAllConversions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L226) | :closed_lock_with_key:  | GET | `/conversions` |
| [getCurrencies()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L246) |  | GET | `/currencies` |
| [getCurrency()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L255) |  | GET | `/currencies/{currency_id}` |
| [depositFromCoinbaseAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L270) | :closed_lock_with_key:  | POST | `/deposits/coinbase-account` |
| [depositFromPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L284) | :closed_lock_with_key:  | POST | `/deposits/payment-method` |
| [getPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L295) | :closed_lock_with_key:  | GET | `/payment-methods` |
| [getTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L304) | :closed_lock_with_key:  | GET | `/transfers` |
| [getTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L313) | :closed_lock_with_key:  | GET | `/transfers/{transfer_id}` |
| [submitTravelInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L322) | :closed_lock_with_key:  | POST | `/transfers/{transfer_id}/travel-rules` |
| [withdrawToCoinbaseAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L336) | :closed_lock_with_key:  | POST | `/withdrawals/coinbase-account` |
| [withdrawToCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L345) | :closed_lock_with_key:  | POST | `/withdrawals/crypto` |
| [getCryptoWithdrawalFeeEstimate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L354) | :closed_lock_with_key:  | GET | `/withdrawals/fee-estimate` |
| [withdrawToPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L366) | :closed_lock_with_key:  | POST | `/withdrawals/payment-method` |
| [getFees()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L382) | :closed_lock_with_key:  | GET | `/fees` |
| [getFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L397) | :closed_lock_with_key:  | GET | `/fills` |
| [getOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L407) | :closed_lock_with_key:  | GET | `/orders` |
| [cancelAllOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L416) | :closed_lock_with_key:  | DELETE | `/orders` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L429) | :closed_lock_with_key:  | POST | `/orders` |
| [getOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L439) | :closed_lock_with_key:  | GET | `/orders/{order_id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L449) | :closed_lock_with_key:  | DELETE | `/orders/{order_id}` |
| [getLoans()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L467) | :closed_lock_with_key:  | GET | `/loans` |
| [getLoanAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L476) | :closed_lock_with_key:  | GET | `/loans/assets` |
| [getInterestSummaries()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L485) | :closed_lock_with_key:  | GET | `/loans/interest` |
| [getInterestRateHistory()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L494) | :closed_lock_with_key:  | GET | `/loans/interest/history/{loan_id}` |
| [getInterestCharges()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L503) | :closed_lock_with_key:  | GET | `/loans/interest/{loan_id}` |
| [getLendingOverview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L515) | :closed_lock_with_key:  | GET | `/loans/lending-overview` |
| [getNewLoanPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L526) | :closed_lock_with_key:  | GET | `/loans/loan-preview` |
| [submitNewLoan()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L539) | :closed_lock_with_key:  | POST | `/loans/open` |
| [getNewLoanOptions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L548) | :closed_lock_with_key:  | GET | `/loans/options` |
| [repayLoanInterest()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L557) | :closed_lock_with_key:  | POST | `/loans/repay-interest` |
| [repayLoanPrincipal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L566) | :closed_lock_with_key:  | POST | `/loans/repay-principal` |
| [getPrincipalRepaymentPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L576) | :closed_lock_with_key:  | GET | `/loans/repayment-preview` |
| [getSignedPrices()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L593) | :closed_lock_with_key:  | GET | `/oracle` |
| [getAllTradingPairs()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L608) |  | GET | `/products` |
| [getAllProductVolume()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L617) |  | GET | `/products/volume-summary` |
| [getProduct()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L626) |  | GET | `/products/{product_id}` |
| [getProductBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L637) |  | GET | `/products/{product_id}/book` |
| [getProductCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L648) |  | GET | `/products/{product_id}/candles` |
| [getProductStats()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L658) |  | GET | `/products/{product_id}/stats` |
| [getProductTicker()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L667) |  | GET | `/products/{product_id}/ticker` |
| [getProductTrades()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L676) |  | GET | `/products/{product_id}/trades` |
| [getProfiles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L692) | :closed_lock_with_key:  | GET | `/profiles` |
| [createProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L701) | :closed_lock_with_key:  | POST | `/profiles` |
| [transferFundsBetweenProfiles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L710) | :closed_lock_with_key:  | POST | `/profiles/transfer` |
| [getProfileById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L721) | :closed_lock_with_key:  | GET | `/profiles/{profile_id}` |
| [renameProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L734) | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}` |
| [deleteProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L745) | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}/deactivate` |
| [getAllReports()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L763) | :closed_lock_with_key:  | GET | `/reports` |
| [createReport()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L773) | :closed_lock_with_key:  | POST | `/reports` |
| [getReport()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L782) | :closed_lock_with_key:  | GET | `/reports/{report_id}` |
| [getTravelRuleInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L797) | :closed_lock_with_key:  | GET | `/travel-rules` |
| [createTravelRuleEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L808) | :closed_lock_with_key:  | POST | `/travel-rules` |
| [deleteTravelRuleEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L821) | :closed_lock_with_key:  | DELETE | `/travel-rules/{id}` |
| [getUserExchangeLimits()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L836) | :closed_lock_with_key:  | GET | `/users/{user_id}/exchange-limits` |
| [updateSettlementPreference()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L845) | :closed_lock_with_key:  | POST | `/users/{user_id}/settlement-preferences` |
| [getUserTradingVolume()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L860) | :closed_lock_with_key:  | GET | `/users/{user_id}/trading-volumes` |
| [getAllWrappedAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L875) |  | GET | `/wrapped-assets` |
| [getAllStakeWraps()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L884) | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap` |
| [createStakeWrap()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L893) | :closed_lock_with_key:  | POST | `/wrapped-assets/stake-wrap` |
| [getStakeWrap()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L906) | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap/{stake_wrap_id}` |
| [getWrappedAssetDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L917) | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}` |
| [getWrappedAssetConversionRate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L926) | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}/conversion-rate` |

# CBInternationalClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBInternationalClient.ts](/src/CBInternationalClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L56) |  | GET | `/api/v1/assets` |
| [getAssetDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L65) |  | GET | `/api/v1/assets/{asset}` |
| [getSupportedNetworksPerAsset()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L74) |  | GET | `/api/v1/assets/{asset}/networks` |
| [getIndexComposition()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L89) |  | GET | `/api/v1/index/{index}/composition` |
| [getIndexCompositionHistory()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L99) |  | GET | `/api/v1/index/{index}/composition-history` |
| [getIndexPrice()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L111) |  | GET | `/api/v1/index/{index}/price` |
| [getIndexCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L121) |  | GET | `/api/v1/index/{index}/candles` |
| [getInstruments()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L137) |  | GET | `/api/v1/instruments` |
| [getInstrumentDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L146) |  | GET | `/api/v1/instruments/{instrument}` |
| [getQuotePerInstrument()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L155) |  | GET | `/api/v1/instruments/{instrument}/quote` |
| [getDailyTradingVolumes()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L164) |  | GET | `/api/v1/instruments/volumes/daily` |
| [getAggregatedCandlesData()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L173) |  | GET | `/api/v1/instruments/{instrument}/candles` |
| [getHistoricalFundingRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L183) |  | GET | `/api/v1/instruments/{instrument}/funding` |
| [getPositionOffsets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L203) |  | GET | `/api/v1/position-offsets` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L218) | :closed_lock_with_key:  | POST | `/api/v1/orders` |
| [getOpenOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L229) | :closed_lock_with_key:  | GET | `/api/v1/orders` |
| [cancelOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L238) | :closed_lock_with_key:  | DELETE | `/api/v1/orders` |
| [updateOpenOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L249) | :closed_lock_with_key:  | PUT | `/api/v1/orders/{id}` |
| [getOrderDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L259) | :closed_lock_with_key:  | GET | `/api/v1/orders/{id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L269) | :closed_lock_with_key:  | DELETE | `/api/v1/orders/{id}` |
| [getUserPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L287) | :closed_lock_with_key:  | GET | `/api/v1/portfolios` |
| [createPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L296) | :closed_lock_with_key:  | POST | `/api/v1/portfolios` |
| [updatePortfolioParameters()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L305) | :closed_lock_with_key:  | PATCH | `/api/v1/portfolios` |
| [getUserPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L316) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}` |
| [updatePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L325) | :closed_lock_with_key:  | PUT | `/api/v1/portfolios/{portfolio}` |
| [getPortfolioDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L335) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/detail` |
| [getPortfolioSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L344) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/summary` |
| [getPortfolioBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L353) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances` |
| [getBalanceForPortfolioAsset()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L362) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances/{asset}` |
| [getActiveLoansForPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L376) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/loans` |
| [getLoanInfoForPortfolioAsset()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L385) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/loans/{asset}` |
| [acquireOrRepayLoan()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L399) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/loans/{asset}` |
| [previewLoanUpdate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L416) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/loans/{asset}/preview` |
| [getMaxLoanAvailability()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L434) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/loans/{asset}/availability` |
| [getPortfolioPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L448) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions` |
| [getPositionForPortfolioInstrument()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L457) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions/{instrument}` |
| [getTotalOpenPositionLimit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L471) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/position-limits` |
| [getOpenPositionLimitsForAllInstruments()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L482) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/position-limits/positions` |
| [getOpenPositionLimitsForInstrument()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L495) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/position-limits/positions/{instrument}` |
| [getFillsByPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L510) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fills` |
| [getPortfolioFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L519) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/fills` |
| [setCrossCollateral()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L529) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/cross-collateral-enabled` |
| [setAutoMargin()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L546) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/auto-margin-enabled` |
| [setPortfolioMarginOverride()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L559) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/margin` |
| [getFundTransferLimit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L572) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/transfer/{portfolio}/{asset}/transfer-limit` |
| [transferFundsBetweenPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L587) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer` |
| [transferPositionsBetweenPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L599) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer-position` |
| [getPortfolioFeeRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L612) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fee-rates` |
| [getRankings()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L626) | :closed_lock_with_key:  | GET | `/api/v1/rankings/statistics` |
| [getMatchingTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L645) | :closed_lock_with_key:  | GET | `/api/v1/transfers` |
| [getTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L654) | :closed_lock_with_key:  | GET | `/api/v1/transfers/{transfer_uuid}` |
| [withdrawToCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L663) | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw` |
| [createCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L674) | :closed_lock_with_key:  | POST | `/api/v1/transfers/address` |
| [createCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L687) | :closed_lock_with_key:  | POST | `/api/v1/transfers/create-counterparty-id` |
| [validateCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L698) | :closed_lock_with_key:  | POST | `/api/v1/transfers/validate-counterparty-id` |
| [getCounterpartyWithdrawalLimit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L710) | :closed_lock_with_key:  | GET | `/api/v1/transfers/withdraw/{portfolio}/{asset}/counterparty-withdrawal-limit` |
| [withdrawToCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L725) | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw/counterparty` |
| [getFeeRateTiers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L743) | :closed_lock_with_key:  | GET | `/api/v1/fee-rate-tiers` |

# CBPrimeClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBPrimeClient.ts](/src/CBPrimeClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getActivities()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L75) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities` |
| [getActivityById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L85) | :closed_lock_with_key:  | GET | `/v1/activities/{activity_id}` |
| [getEntityActivities()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L95) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/activities` |
| [getPortfolioActivityById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L105) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities/{activity_id}` |
| [createPortfolioAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L126) | :closed_lock_with_key:  | POST | `/v1/allocations` |
| [createPortfolioNetAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L137) | :closed_lock_with_key:  | POST | `/v1/allocations/net` |
| [getPortfolioAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L148) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations` |
| [getAllocationById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L160) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/{allocation_id}` |
| [getNetAllocationsByNettingId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L175) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/net/{netting_id}` |
| [getEntityAccruals()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L196) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/accruals` |
| [getEntityLocateAvailabilities()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L206) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/locates_availability` |
| [getEntityMargin()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L221) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/margin` |
| [getEntityMarginSummaries()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L231) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/margin_summaries` |
| [getEntityTFTieredFees()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L243) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/tf_tiered_fees` |
| [getPortfolioAccruals()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L255) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/accruals` |
| [getPortfolioBuyingPower()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L265) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/buying_power` |
| [getPortfolioLocates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L280) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/locates` |
| [getPortfolioMarginConversions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L291) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/margin_conversions` |
| [getPortfolioWithdrawalPower()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L306) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/withdrawal_power` |
| [getInvoices()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L327) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/invoices` |
| [getEntityAggregatePositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L343) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/aggregate_positions` |
| [getEntityPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L360) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/positions` |
| [getAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L380) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/assets` |
| [getEntityPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L395) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods` |
| [getEntityPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L404) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods/{payment_method_id}` |
| [getUsers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L425) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/users` |
| [getPortfolioUsers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L435) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/users` |
| [getPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L451) | :closed_lock_with_key:  | GET | `/v1/portfolios` |
| [getPortfolioById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L460) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}` |
| [getPortfolioCreditInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L469) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/credit` |
| [getAddressBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L486) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/address_book` |
| [createAddressBookEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L499) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/address_book` |
| [getPortfolioBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L519) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/balances` |
| [getWalletBalance()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L533) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/balance` |
| [getWeb3WalletBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L548) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/web3_balances` |
| [getPortfolioCommission()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L569) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/commission` |
| [getPortfolioFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L587) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/fills` |
| [getOpenOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L597) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/open_orders` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L607) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order` |
| [getOrderPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L620) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order_preview` |
| [getPortfolioOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L632) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders` |
| [getOrderById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L642) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L655) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/orders/{order_id}/cancel` |
| [getOrderFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L670) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}/fills` |
| [getPortfolioProducts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L689) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/products` |
| [getPortfolioTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L705) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions` |
| [getTransactionById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L720) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions/{transaction_id}` |
| [createConversion()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L735) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/conversion` |
| [getWalletTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L748) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transactions` |
| [createTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L763) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transfers` |
| [createWithdrawal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L776) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/withdrawals` |
| [getPortfolioWallets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L795) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets` |
| [createWallet()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L805) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets` |
| [getWalletById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L817) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}` |
| [getWalletDepositInstructions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L832) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/deposit_instructions` |

# CBCommerceClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBCommerceClient.ts](/src/CBCommerceClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [createCharge()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L38) | :closed_lock_with_key:  | POST | `/charges` |
| [getAllCharges()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L63) | :closed_lock_with_key:  | GET | `/charges` |
| [getCharge()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L72) | :closed_lock_with_key:  | GET | `/charges/{charge_code_or_charge_id}` |
| [createCheckout()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L87) | :closed_lock_with_key:  | POST | `/checkouts` |
| [getAllCheckouts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L110) | :closed_lock_with_key:  | GET | `/checkouts` |
| [getCheckout()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L119) | :closed_lock_with_key:  | GET | `/checkouts/{checkout_id}` |
| [listEvents()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L134) | :closed_lock_with_key:  | GET | `/events` |
| [showEvent()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L145) | :closed_lock_with_key:  | GET | `/events/{event_id}` |