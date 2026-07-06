
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
| [getAccounts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L149) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/accounts` |
| [getAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L163) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/accounts/{account_id}` |
| [getBestBidAsk()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L180) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/best_bid_ask` |
| [getProductBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L191) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/product_book` |
| [getProducts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L205) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products` |
| [getProduct()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L217) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}` |
| [getProductCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L233) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}/candles` |
| [getMarketTrades()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L248) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/products/{product_id}/ticker` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L270) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders` |
| [cancelOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L287) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/batch_cancel` |
| [updateOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L304) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/edit` |
| [updateOrderPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L318) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/edit_preview` |
| [getOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L336) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/batch` |
| [getFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L351) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/fills` |
| [getOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L363) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/orders/historical/{order_id}` |
| [previewOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L381) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/preview` |
| [closePosition()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L395) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/orders/close_position` |
| [getPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L415) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/portfolios` |
| [createPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L428) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/portfolios` |
| [movePortfolioFunds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L441) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/portfolios/move_funds` |
| [getPortfolioBreakdown()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L455) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| [deletePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L471) | :closed_lock_with_key:  | DELETE | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| [updatePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L482) | :closed_lock_with_key:  | PUT | `/api/v3/brokerage/portfolios/{portfolio_uuid}` |
| [getFuturesBalanceSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L513) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/balance_summary` |
| [getIntradayMarginSetting()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L524) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/intraday/margin_setting` |
| [setIntradayMarginSetting()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L538) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/cfm/intraday/margin_setting` |
| [getCurrentMarginWindow()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L554) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/intraday/current_margin_window` |
| [getFuturesPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L571) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/positions` |
| [getFuturesPosition()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L580) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/positions/{product_id}` |
| [scheduleFuturesSweep()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L600) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/cfm/sweeps/schedule` |
| [getFuturesSweeps()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L618) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/cfm/sweeps` |
| [cancelPendingFuturesSweep()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L627) | :closed_lock_with_key:  | DELETE | `/api/v3/brokerage/cfm/sweeps` |
| [allocatePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L643) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/intx/allocate` |
| [getPerpetualsPortfolioSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L654) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/portfolio/{portfolio_uuid}` |
| [getPerpetualsPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L668) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/positions/{portfolio_uuid}` |
| [getPerpetualsPosition()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L683) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/positions/{portfolio_uuid}/{symbol}` |
| [getPortfoliosBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L698) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/intx/balances/{portfolio_uuid}` |
| [updateMultiAssetCollateral()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L710) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/intx/multi_asset_collateral` |
| [getTransactionSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L730) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/transaction_summary` |
| [submitConvertQuote()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L748) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/convert/quote` |
| [getConvertTrade()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L759) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/convert/trade/{trade_id}` |
| [commitConvertTrade()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L776) | :closed_lock_with_key:  | POST | `/api/v3/brokerage/convert/trade/{trade_id}` |
| [getPublicProductBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L806) |  | GET | `/api/v3/brokerage/market/product_book` |
| [getPublicProducts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L819) |  | GET | `/api/v3/brokerage/market/products` |
| [getPublicProduct()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L831) |  | GET | `/api/v3/brokerage/market/products/{product_id}` |
| [getPublicProductCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L843) |  | GET | `/api/v3/brokerage/market/products/{product_id}/candles` |
| [getPublicMarketTrades()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L858) |  | GET | `/api/v3/brokerage/market/products/{product_id}/ticker` |
| [getPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L879) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/payment_methods` |
| [getPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L890) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/payment_methods/{payment_method_id}` |
| [getApiKeyPermissions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L910) | :closed_lock_with_key:  | GET | `/api/v3/brokerage/key_permissions` |

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
| [getAccounts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L72) | :closed_lock_with_key:  | GET | `/accounts` |
| [getAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L81) | :closed_lock_with_key:  | GET | `/accounts/{account_id}` |
| [getAccountHolds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L92) | :closed_lock_with_key:  | GET | `/accounts/{account_id}/holds` |
| [getAccountLedger()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L111) | :closed_lock_with_key:  | GET | `/accounts/{account_id}/ledger` |
| [getAccountTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L121) | :closed_lock_with_key:  | GET | `/accounts/{account_id}/transfers` |
| [getAddressBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L137) | :closed_lock_with_key:  | GET | `/address-book` |
| [addAddresses()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L146) | :closed_lock_with_key:  | POST | `/address-book` |
| [deleteAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L155) | :closed_lock_with_key:  | DELETE | `/address-book/{id}` |
| [getCounterpartyAddressBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L164) | :closed_lock_with_key:  | GET | `/address-book/counterparty` |
| [updateAddressBookEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L173) | :closed_lock_with_key:  | PUT | `/address-book/{id}` |
| [getCoinbaseWallets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L191) | :closed_lock_with_key:  | GET | `/coinbase-accounts` |
| [createNewCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L200) | :closed_lock_with_key:  | POST | `/coinbase-accounts/{account_id}/addresses` |
| [convertCurrency()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L218) | :closed_lock_with_key:  | POST | `/conversions` |
| [getConversionFeeRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L227) | :closed_lock_with_key:  | GET | `/conversions/fees` |
| [getConversion()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L236) | :closed_lock_with_key:  | GET | `/conversions/{conversion_id}` |
| [getAllConversions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L249) | :closed_lock_with_key:  | GET | `/conversions` |
| [getCurrencies()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L269) |  | GET | `/currencies` |
| [getCurrency()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L278) |  | GET | `/currencies/{currency_id}` |
| [depositFromCoinbaseAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L293) | :closed_lock_with_key:  | POST | `/deposits/coinbase-account` |
| [depositFromPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L307) | :closed_lock_with_key:  | POST | `/deposits/payment-method` |
| [getPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L318) | :closed_lock_with_key:  | GET | `/payment-methods` |
| [getTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L327) | :closed_lock_with_key:  | GET | `/transfers` |
| [getTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L336) | :closed_lock_with_key:  | GET | `/transfers/{transfer_id}` |
| [submitTravelInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L345) | :closed_lock_with_key:  | POST | `/transfers/{transfer_id}/travel-rules` |
| [withdrawToCoinbaseAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L359) | :closed_lock_with_key:  | POST | `/withdrawals/coinbase-account` |
| [withdrawToCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L368) | :closed_lock_with_key:  | POST | `/withdrawals/crypto` |
| [getCryptoWithdrawalFeeEstimate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L377) | :closed_lock_with_key:  | GET | `/withdrawals/fee-estimate` |
| [withdrawToPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L389) | :closed_lock_with_key:  | POST | `/withdrawals/payment-method` |
| [getFees()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L405) | :closed_lock_with_key:  | GET | `/fees` |
| [getFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L420) | :closed_lock_with_key:  | GET | `/fills` |
| [getOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L430) | :closed_lock_with_key:  | GET | `/orders` |
| [cancelAllOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L439) | :closed_lock_with_key:  | DELETE | `/orders` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L452) | :closed_lock_with_key:  | POST | `/orders` |
| [getOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L462) | :closed_lock_with_key:  | GET | `/orders/{order_id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L472) | :closed_lock_with_key:  | DELETE | `/orders/{order_id}` |
| [getLoans()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L490) | :closed_lock_with_key:  | GET | `/loans` |
| [getLoanAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L499) | :closed_lock_with_key:  | GET | `/loans/assets` |
| [getInterestSummaries()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L508) | :closed_lock_with_key:  | GET | `/loans/interest` |
| [getInterestRateHistory()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L517) | :closed_lock_with_key:  | GET | `/loans/interest/history/{loan_id}` |
| [getInterestCharges()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L526) | :closed_lock_with_key:  | GET | `/loans/interest/{loan_id}` |
| [getLendingOverview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L538) | :closed_lock_with_key:  | GET | `/loans/lending-overview` |
| [getNewLoanPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L549) | :closed_lock_with_key:  | GET | `/loans/loan-preview` |
| [submitNewLoan()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L562) | :closed_lock_with_key:  | POST | `/loans/open` |
| [getNewLoanOptions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L571) | :closed_lock_with_key:  | GET | `/loans/options` |
| [repayLoanInterest()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L580) | :closed_lock_with_key:  | POST | `/loans/repay-interest` |
| [repayLoanPrincipal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L589) | :closed_lock_with_key:  | POST | `/loans/repay-principal` |
| [getPrincipalRepaymentPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L599) | :closed_lock_with_key:  | GET | `/loans/repayment-preview` |
| [getSignedPrices()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L616) | :closed_lock_with_key:  | GET | `/oracle` |
| [getAllTradingPairs()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L631) |  | GET | `/products` |
| [getAllProductVolume()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L640) |  | GET | `/products/volume-summary` |
| [getProduct()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L649) |  | GET | `/products/{product_id}` |
| [getProductBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L660) |  | GET | `/products/{product_id}/book` |
| [getProductCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L671) |  | GET | `/products/{product_id}/candles` |
| [getProductStats()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L681) |  | GET | `/products/{product_id}/stats` |
| [getProductTicker()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L690) |  | GET | `/products/{product_id}/ticker` |
| [getProductTrades()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L699) |  | GET | `/products/{product_id}/trades` |
| [getProfiles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L715) | :closed_lock_with_key:  | GET | `/profiles` |
| [createProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L724) | :closed_lock_with_key:  | POST | `/profiles` |
| [transferFundsBetweenProfiles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L733) | :closed_lock_with_key:  | POST | `/profiles/transfer` |
| [getProfileById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L744) | :closed_lock_with_key:  | GET | `/profiles/{profile_id}` |
| [renameProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L757) | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}` |
| [deleteProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L768) | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}/deactivate` |
| [getAllReports()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L786) | :closed_lock_with_key:  | GET | `/reports` |
| [createReport()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L796) | :closed_lock_with_key:  | POST | `/reports` |
| [getReport()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L805) | :closed_lock_with_key:  | GET | `/reports/{report_id}` |
| [getTravelRuleInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L820) | :closed_lock_with_key:  | GET | `/travel-rules` |
| [createTravelRuleEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L831) | :closed_lock_with_key:  | POST | `/travel-rules` |
| [deleteTravelRuleEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L844) | :closed_lock_with_key:  | DELETE | `/travel-rules/{id}` |
| [getUserExchangeLimits()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L859) | :closed_lock_with_key:  | GET | `/users/{user_id}/exchange-limits` |
| [updateSettlementPreference()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L868) | :closed_lock_with_key:  | POST | `/users/{user_id}/settlement-preferences` |
| [getUserTradingVolume()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L883) | :closed_lock_with_key:  | GET | `/users/{user_id}/trading-volumes` |
| [getAllWrappedAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L898) |  | GET | `/wrapped-assets` |
| [getAllStakeWraps()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L907) | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap` |
| [createStakeWrap()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L916) | :closed_lock_with_key:  | POST | `/wrapped-assets/stake-wrap` |
| [getStakeWrap()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L929) | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap/{stake_wrap_id}` |
| [getWrappedAssetDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L940) | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}` |
| [getWrappedAssetConversionRate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L949) | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}/conversion-rate` |

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
| [updateOpenOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L247) | :closed_lock_with_key:  | PUT | `/api/v1/orders/{id}` |
| [getOrderDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L257) | :closed_lock_with_key:  | GET | `/api/v1/orders/{id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L267) | :closed_lock_with_key:  | DELETE | `/api/v1/orders/{id}` |
| [getUserPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L285) | :closed_lock_with_key:  | GET | `/api/v1/portfolios` |
| [createPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L294) | :closed_lock_with_key:  | POST | `/api/v1/portfolios` |
| [updatePortfolioParameters()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L303) | :closed_lock_with_key:  | PATCH | `/api/v1/portfolios` |
| [getUserPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L314) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}` |
| [updatePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L323) | :closed_lock_with_key:  | PUT | `/api/v1/portfolios/{portfolio}` |
| [getPortfolioDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L333) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/detail` |
| [getPortfolioSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L342) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/summary` |
| [getPortfolioBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L351) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances` |
| [getBalanceForPortfolioAsset()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L360) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances/{asset}` |
| [getActiveLoansForPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L374) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/loans` |
| [getLoanInfoForPortfolioAsset()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L383) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/loans/{asset}` |
| [acquireOrRepayLoan()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L397) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/loans/{asset}` |
| [previewLoanUpdate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L414) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/loans/{asset}/preview` |
| [getMaxLoanAvailability()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L432) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/loans/{asset}/availability` |
| [getPortfolioPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L446) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions` |
| [getPositionForPortfolioInstrument()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L455) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions/{instrument}` |
| [getTotalOpenPositionLimit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L469) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/position-limits` |
| [getOpenPositionLimitsForAllInstruments()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L480) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/position-limits/positions` |
| [getOpenPositionLimitsForInstrument()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L493) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/position-limits/positions/{instrument}` |
| [getFillsByPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L508) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fills` |
| [getPortfolioFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L517) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/fills` |
| [setCrossCollateral()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L527) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/cross-collateral-enabled` |
| [setAutoMargin()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L544) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/auto-margin-enabled` |
| [setPortfolioMarginOverride()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L557) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/margin` |
| [getFundTransferLimit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L570) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/transfer/{portfolio}/{asset}/transfer-limit` |
| [transferFundsBetweenPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L585) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer` |
| [transferPositionsBetweenPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L597) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer-position` |
| [getPortfolioFeeRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L610) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fee-rates` |
| [getRankings()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L624) | :closed_lock_with_key:  | GET | `/api/v1/rankings/statistics` |
| [getMatchingTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L643) | :closed_lock_with_key:  | GET | `/api/v1/transfers` |
| [getTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L652) | :closed_lock_with_key:  | GET | `/api/v1/transfers/{transfer_uuid}` |
| [withdrawToCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L661) | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw` |
| [createCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L672) | :closed_lock_with_key:  | POST | `/api/v1/transfers/address` |
| [createCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L685) | :closed_lock_with_key:  | POST | `/api/v1/transfers/create-counterparty-id` |
| [validateCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L696) | :closed_lock_with_key:  | POST | `/api/v1/transfers/validate-counterparty-id` |
| [getCounterpartyWithdrawalLimit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L708) | :closed_lock_with_key:  | GET | `/api/v1/transfers/withdraw/{portfolio}/{asset}/counterparty-withdrawal-limit` |
| [withdrawToCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L723) | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw/counterparty` |
| [getFeeRateTiers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L741) | :closed_lock_with_key:  | GET | `/api/v1/fee-rate-tiers` |

# CBPrimeClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBPrimeClient.ts](/src/CBPrimeClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getActivities()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L77) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities` |
| [getActivityById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L87) | :closed_lock_with_key:  | GET | `/v1/activities/{activity_id}` |
| [getEntityActivities()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L97) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/activities` |
| [getPortfolioActivityById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L107) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities/{activity_id}` |
| [createPortfolioAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L128) | :closed_lock_with_key:  | POST | `/v1/allocations` |
| [createPortfolioNetAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L139) | :closed_lock_with_key:  | POST | `/v1/allocations/net` |
| [getPortfolioAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L150) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations` |
| [getAllocationById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L162) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/{allocation_id}` |
| [getNetAllocationsByNettingId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L177) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/net/{netting_id}` |
| [getEntityAccruals()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L198) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/accruals` |
| [getEntityLocateAvailabilities()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L208) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/locates_availability` |
| [getEntityMargin()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L223) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/margin` |
| [getEntityMarginSummaries()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L233) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/margin_summaries` |
| [getEntityTFTieredFees()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L245) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/tf_tiered_fees` |
| [getPortfolioAccruals()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L257) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/accruals` |
| [getPortfolioBuyingPower()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L267) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/buying_power` |
| [getPortfolioLocates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L282) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/locates` |
| [getPortfolioMarginConversions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L293) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/margin_conversions` |
| [getPortfolioWithdrawalPower()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L308) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/withdrawal_power` |
| [getInvoices()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L329) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/invoices` |
| [getEntityAggregatePositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L345) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/aggregate_positions` |
| [getEntityPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L362) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/positions` |
| [getAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L382) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/assets` |
| [getEntityPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L397) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods` |
| [getEntityPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L406) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods/{payment_method_id}` |
| [getUsers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L427) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/users` |
| [getPortfolioUsers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L437) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/users` |
| [getPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L453) | :closed_lock_with_key:  | GET | `/v1/portfolios` |
| [getPortfolioById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L462) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}` |
| [getPortfolioCreditInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L471) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/credit` |
| [getAddressBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L488) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/address_book` |
| [createAddressBookEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L501) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/address_book` |
| [getPortfolioBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L521) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/balances` |
| [getWalletBalance()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L535) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/balance` |
| [getWeb3WalletBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L550) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/web3_balances` |
| [getPortfolioCommission()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L571) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/commission` |
| [getPortfolioFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L589) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/fills` |
| [getOpenOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L599) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/open_orders` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L609) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order` |
| [getOrderPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L622) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order_preview` |
| [getPortfolioOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L634) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders` |
| [getOrderById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L644) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L657) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/orders/{order_id}/cancel` |
| [getOrderFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L672) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}/fills` |
| [editOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L685) | :closed_lock_with_key:  | PUT | `/v1/portfolios/{portfolio_id}/orders/{order_id}/edit` |
| [rotateApiKey()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L699) | :closed_lock_with_key:  | POST | `/v1/api-keys/rotate` |
| [getPortfolioProducts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L714) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/products` |
| [getPortfolioTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L730) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions` |
| [getTransactionById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L745) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions/{transaction_id}` |
| [createConversion()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L760) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/conversion` |
| [getWalletTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L773) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transactions` |
| [createTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L788) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transfers` |
| [createWithdrawal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L801) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/withdrawals` |
| [getPortfolioWallets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L820) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets` |
| [createWallet()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L830) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets` |
| [getWalletById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L842) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}` |
| [getWalletDepositInstructions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L857) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/deposit_instructions` |

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