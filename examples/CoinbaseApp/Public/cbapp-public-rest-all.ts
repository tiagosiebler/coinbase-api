import { CBAppClient } from '../../../src/index.js';

/**
 * import { CBAppClient } from 'coinbase-api';
 * const { CBAppClient } = require('coinbase-api');
 */

// Initialize the client, you can pass in api keys here if you have them but they are not required for public endpoints
const client = new CBAppClient();

async function publicCalls() {
  try {
    // Get fiat currencies
    const fiatCurrencies = await client.getFiatCurrencies();
    console.log('Fiat Currencies: ', fiatCurrencies);

    // Get cryptocurrencies
    const cryptocurrencies = await client.getCryptocurrencies();
    console.log('Cryptocurrencies: ', cryptocurrencies);

    // Get exchange rates
    const exchangeRates = await client.getExchangeRates({ currency: 'USD' });
    console.log('Exchange Rates: ', exchangeRates);

    // Get buy price
    const buyPrice = await client.getBuyPrice({ currencyPair: 'BTC-USD' });
    console.log('Buy Price: ', buyPrice);

    // Get sell price
    const sellPrice = await client.getSellPrice({ currencyPair: 'BTC-USD' });
    console.log('Sell Price: ', sellPrice);

    // Get spot price
    const spotPrice = await client.getSpotPrice({ currencyPair: 'BTC-USD' });
    console.log('Spot Price: ', spotPrice);

    // Get current time
    const currentTime = await client.getCurrentTime();
    console.log('Current Time: ', currentTime);
  } catch (e) {
    console.error('Error: ', e);
  }
}

publicCalls();
