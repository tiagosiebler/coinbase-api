
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
| [getAccounts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L64) | :closed_lock_with_key:  | GET | `/v2/accounts` |
| [getAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L79) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}` |
| [createAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L96) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/addresses` |
| [getAddresses()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L112) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses` |
| [getAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L133) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses/{addressId}` |
| [getAddressTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L150) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/addresses/{addressId}/transactions` |
| [sendMoney()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L178) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/transactions` |
| [transferMoney()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L193) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/transactions` |
| [getTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L210) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/transactions` |
| [getTransaction()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L228) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/transactions/{transactionId}` |
| [depositFunds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L250) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/deposits` |
| [commitDeposit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L264) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/deposits/{deposit_id}/commit` |
| [getDeposits()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L281) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/deposits` |
| [getDeposit()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L296) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/deposits/{deposit_id}` |
| [withdrawFunds()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L315) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/withdrawals` |
| [commitWithdrawal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L329) | :closed_lock_with_key:  | POST | `/v2/accounts/{account_id}/withdrawals/{withdrawal_id}/commit` |
| [getWithdrawals()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L346) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/withdrawals` |
| [getWithdrawal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L364) | :closed_lock_with_key:  | GET | `/v2/accounts/{account_id}/withdrawals/{withdrawal_id}` |
| [getFiatCurrencies()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L387) |  | GET | `/v2/currencies` |
| [getCryptocurrencies()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L398) |  | GET | `/v2/currencies/crypto` |
| [getExchangeRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L414) |  | GET | `/v2/exchange-rates` |
| [getBuyPrice()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L435) |  | GET | `/v2/prices/{currencyPair}/buy` |
| [getSellPrice()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L450) |  | GET | `/v2/prices/{currencyPair}/sell` |
| [getSpotPrice()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L465) |  | GET | `/v2/prices/{currencyPair}/spot` |
| [getCurrentTime()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L487) |  | GET | `/v2/time` |

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
| [getCurrencies()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L232) |  | GET | `/currencies` |
| [getCurrency()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L241) |  | GET | `/currencies/{currency_id}` |
| [depositFromCoinbaseAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L256) | :closed_lock_with_key:  | POST | `/deposits/coinbase-account` |
| [depositFromPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L270) | :closed_lock_with_key:  | POST | `/deposits/payment-method` |
| [getPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L281) | :closed_lock_with_key:  | GET | `/payment-methods` |
| [getTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L290) | :closed_lock_with_key:  | GET | `/transfers` |
| [getTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L299) | :closed_lock_with_key:  | GET | `/transfers/{transfer_id}` |
| [submitTravelInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L308) | :closed_lock_with_key:  | POST | `/transfers/{transfer_id}/travel-rules` |
| [withdrawToCoinbaseAccount()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L322) | :closed_lock_with_key:  | POST | `/withdrawals/coinbase-account` |
| [withdrawToCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L331) | :closed_lock_with_key:  | POST | `/withdrawals/crypto` |
| [getCryptoWithdrawalFeeEstimate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L340) | :closed_lock_with_key:  | GET | `/withdrawals/fee-estimate` |
| [withdrawToPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L352) | :closed_lock_with_key:  | POST | `/withdrawals/payment-method` |
| [getFees()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L368) | :closed_lock_with_key:  | GET | `/fees` |
| [getFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L383) | :closed_lock_with_key:  | GET | `/fills` |
| [getOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L393) | :closed_lock_with_key:  | GET | `/orders` |
| [cancelAllOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L402) | :closed_lock_with_key:  | DELETE | `/orders` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L415) | :closed_lock_with_key:  | POST | `/orders` |
| [getOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L425) | :closed_lock_with_key:  | GET | `/orders/{order_id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L435) | :closed_lock_with_key:  | DELETE | `/orders/{order_id}` |
| [getLoans()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L453) | :closed_lock_with_key:  | GET | `/loans` |
| [getLoanAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L462) | :closed_lock_with_key:  | GET | `/loans/assets` |
| [getInterestSummaries()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L471) | :closed_lock_with_key:  | GET | `/loans/interest` |
| [getInterestRateHistory()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L480) | :closed_lock_with_key:  | GET | `/loans/interest/history/{loan_id}` |
| [getInterestCharges()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L489) | :closed_lock_with_key:  | GET | `/loans/interest/{loan_id}` |
| [getLendingOverview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L501) | :closed_lock_with_key:  | GET | `/loans/lending-overview` |
| [getNewLoanPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L512) | :closed_lock_with_key:  | GET | `/loans/loan-preview` |
| [submitNewLoan()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L525) | :closed_lock_with_key:  | POST | `/loans/open` |
| [getNewLoanOptions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L534) | :closed_lock_with_key:  | GET | `/loans/options` |
| [repayLoanInterest()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L543) | :closed_lock_with_key:  | POST | `/loans/repay-interest` |
| [repayLoanPrincipal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L552) | :closed_lock_with_key:  | POST | `/loans/repay-principal` |
| [getPrincipalRepaymentPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L562) | :closed_lock_with_key:  | GET | `/loans/repayment-preview` |
| [getSignedPrices()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L579) | :closed_lock_with_key:  | GET | `/oracle` |
| [getAllTradingPairs()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L594) |  | GET | `/products` |
| [getAllProductVolume()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L603) |  | GET | `/products/volume-summary` |
| [getProduct()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L612) |  | GET | `/products/{product_id}` |
| [getProductBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L623) |  | GET | `/products/{product_id}/book` |
| [getProductCandles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L634) |  | GET | `/products/{product_id}/candles` |
| [getProductStats()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L644) |  | GET | `/products/{product_id}/stats` |
| [getProductTicker()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L653) |  | GET | `/products/{product_id}/ticker` |
| [getProductTrades()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L662) |  | GET | `/products/{product_id}/trades` |
| [getProfiles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L678) | :closed_lock_with_key:  | GET | `/profiles` |
| [createProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L687) | :closed_lock_with_key:  | POST | `/profiles` |
| [transferFundsBetweenProfiles()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L696) | :closed_lock_with_key:  | POST | `/profiles/transfer` |
| [getProfileById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L707) | :closed_lock_with_key:  | GET | `/profiles/{profile_id}` |
| [renameProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L720) | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}` |
| [deleteProfile()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L731) | :closed_lock_with_key:  | PUT | `/profiles/{profile_id}/deactivate` |
| [getAllReports()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L749) | :closed_lock_with_key:  | GET | `/reports` |
| [createReport()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L759) | :closed_lock_with_key:  | POST | `/reports` |
| [getReport()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L768) | :closed_lock_with_key:  | GET | `/reports/{report_id}` |
| [getTravelRuleInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L783) | :closed_lock_with_key:  | GET | `/travel-rules` |
| [createTravelRuleEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L794) | :closed_lock_with_key:  | POST | `/travel-rules` |
| [deleteTravelRuleEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L807) | :closed_lock_with_key:  | DELETE | `/travel-rules/{id}` |
| [getUserExchangeLimits()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L822) | :closed_lock_with_key:  | GET | `/users/{user_id}/exchange-limits` |
| [updateSettlementPreference()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L831) | :closed_lock_with_key:  | POST | `/users/{user_id}/settlement-preferences` |
| [getUserTradingVolume()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L846) | :closed_lock_with_key:  | GET | `/users/{user_id}/trading-volumes` |
| [getAllWrappedAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L861) |  | GET | `/wrapped-assets` |
| [getAllStakeWraps()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L870) | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap` |
| [createStakeWrap()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L879) | :closed_lock_with_key:  | POST | `/wrapped-assets/stake-wrap` |
| [getStakeWrap()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L892) | :closed_lock_with_key:  | GET | `/wrapped-assets/stake-wrap/{stake_wrap_id}` |
| [getWrappedAssetDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L903) | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}` |
| [getWrappedAssetConversionRate()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L912) | :closed_lock_with_key:  | GET | `/wrapped-assets/{wrapped_asset_id}/conversion-rate` |

# CBInternationalClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBInternationalClient.ts](/src/CBInternationalClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L54) |  | GET | `/api/v1/assets` |
| [getAssetDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L63) |  | GET | `/api/v1/assets/{asset}` |
| [getSupportedNetworksPerAsset()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L72) |  | GET | `/api/v1/assets/{asset}/networks` |
| [getInstruments()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L87) |  | GET | `/api/v1/instruments` |
| [getInstrumentDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L96) |  | GET | `/api/v1/instruments/{instrument}` |
| [getQuotePerInstrument()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L105) |  | GET | `/api/v1/instruments/{instrument}/quote` |
| [getDailyTradingVolumes()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L114) |  | GET | `/api/v1/instruments/volumes/daily` |
| [getAggregatedCandlesData()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L123) |  | GET | `/api/v1/instruments/{instrument}/candles` |
| [getHistoricalFundingRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L133) |  | GET | `/api/v1/instruments/{instrument}/funding` |
| [getPositionOffsets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L153) |  | GET | `/api/v1/position-offsets` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L168) | :closed_lock_with_key:  | POST | `/api/v1/orders` |
| [getOpenOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L179) | :closed_lock_with_key:  | GET | `/api/v1/orders` |
| [cancelOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L188) | :closed_lock_with_key:  | DELETE | `/api/v1/orders` |
| [updateOpenOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L199) | :closed_lock_with_key:  | PUT | `/api/v1/orders/{id}` |
| [getOrderDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L209) | :closed_lock_with_key:  | GET | `/api/v1/orders/{id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L219) | :closed_lock_with_key:  | DELETE | `/api/v1/orders/{id}` |
| [getUserPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L237) | :closed_lock_with_key:  | GET | `/api/v1/portfolios` |
| [createPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L246) | :closed_lock_with_key:  | POST | `/api/v1/portfolios` |
| [updatePortfolioParameters()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L255) | :closed_lock_with_key:  | PATCH | `/api/v1/portfolios` |
| [getUserPortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L266) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}` |
| [updatePortfolio()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L275) | :closed_lock_with_key:  | PUT | `/api/v1/portfolios/{portfolio}` |
| [getPortfolioDetails()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L285) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/detail` |
| [getPortfolioSummary()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L294) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/summary` |
| [getPortfolioBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L303) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances` |
| [getBalanceForPortfolioAsset()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L312) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/balances/{asset}` |
| [getPortfolioPositions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L326) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions` |
| [getPositionForPortfolioInstrument()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L335) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/positions/{instrument}` |
| [getFillsByPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L349) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fills` |
| [getPortfolioFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L358) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/{portfolio}/fills` |
| [setCrossCollateral()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L368) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/cross-collateral-enabled` |
| [setAutoMargin()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L385) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/{portfolio}/auto-margin-enabled` |
| [setPortfolioMarginOverride()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L398) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/margin` |
| [transferFundsBetweenPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L410) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer` |
| [transferPositionsBetweenPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L422) | :closed_lock_with_key:  | POST | `/api/v1/portfolios/transfer-position` |
| [getPortfolioFeeRates()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L435) | :closed_lock_with_key:  | GET | `/api/v1/portfolios/fee-rates` |
| [getRankings()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L449) | :closed_lock_with_key:  | GET | `/api/v1/rankings/statistics` |
| [getMatchingTransfers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L468) | :closed_lock_with_key:  | GET | `/api/v1/transfers` |
| [getTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L477) | :closed_lock_with_key:  | GET | `/api/v1/transfers/{transfer_uuid}` |
| [withdrawToCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L486) | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw` |
| [createCryptoAddress()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L497) | :closed_lock_with_key:  | POST | `/api/v1/transfers/address` |
| [createCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L510) | :closed_lock_with_key:  | POST | `/api/v1/transfers/create-counterparty-id` |
| [validateCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L521) | :closed_lock_with_key:  | POST | `/api/v1/transfers/validate-counterparty-id` |
| [withdrawToCounterpartyId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L532) | :closed_lock_with_key:  | POST | `/api/v1/transfers/withdraw/counterparty` |
| [getFeeRateTiers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L550) | :closed_lock_with_key:  | GET | `/api/v1/fee-rate-tiers` |

# CBPrimeClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [CBPrimeClient.ts](/src/CBPrimeClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [createPortfolioAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L65) | :closed_lock_with_key:  | POST | `/v1/allocations` |
| [createPortfolioNetAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L76) | :closed_lock_with_key:  | POST | `/v1/allocations/net` |
| [getPortfolioAllocations()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L87) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations` |
| [getAllocationById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L99) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/{allocation_id}` |
| [getNetAllocationsByNettingId()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L114) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/allocations/net/{netting_id}` |
| [getInvoices()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L135) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/invoices` |
| [getAssets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L151) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/assets` |
| [getEntityPaymentMethods()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L166) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods` |
| [getEntityPaymentMethod()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L175) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/payment-methods/{payment_method_id}` |
| [getUsers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L196) | :closed_lock_with_key:  | GET | `/v1/entities/{entity_id}/users` |
| [getPortfolioUsers()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L206) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/users` |
| [getPortfolios()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L222) | :closed_lock_with_key:  | GET | `/v1/portfolios` |
| [getPortfolioById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L231) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}` |
| [getPortfolioCreditInformation()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L240) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/credit` |
| [getActivities()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L257) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities` |
| [getActivityById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L267) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/activities/{activity_id}` |
| [getAddressBook()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L288) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/address_book` |
| [createAddressBookEntry()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L301) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/address_book` |
| [getPortfolioBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L321) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/balances` |
| [getWalletBalance()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L335) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/balance` |
| [getWeb3WalletBalances()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L350) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/web3_balances` |
| [getPortfolioCommission()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L371) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/commission` |
| [getPortfolioFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L389) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/fills` |
| [getOpenOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L399) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/open_orders` |
| [submitOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L409) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order` |
| [getOrderPreview()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L422) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/order_preview` |
| [getPortfolioOrders()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L434) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders` |
| [getOrderById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L444) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}` |
| [cancelOrder()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L457) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/orders/{order_id}/cancel` |
| [getOrderFills()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L472) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/orders/{order_id}/fills` |
| [getPortfolioProducts()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L491) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/products` |
| [getPortfolioTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L507) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions` |
| [getTransactionById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L522) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/transactions/{transaction_id}` |
| [createConversion()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L537) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/conversion` |
| [getWalletTransactions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L550) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transactions` |
| [createTransfer()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L565) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/transfers` |
| [createWithdrawal()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L578) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/withdrawals` |
| [getPortfolioWallets()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L597) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets` |
| [createWallet()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L607) | :closed_lock_with_key:  | POST | `/v1/portfolios/{portfolio_id}/wallets` |
| [getWalletById()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L619) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}` |
| [getWalletDepositInstructions()](https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L634) | :closed_lock_with_key:  | GET | `/v1/portfolios/{portfolio_id}/wallets/{wallet_id}/deposit_instructions` |

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