import { CBExchangeClient } from '../../src/index.js';
// import { CBExchangeClient } from 'coinbase-api';

// Initialize the client, you can pass in api keys here if you have them but they are not required for public endpoints
const client = new CBExchangeClient();

async function publicExchangeCalls() {
  try {
    // Get all known currencies
    const currencies = await client.getCurrencies();
    console.log('Currencies: ', currencies);

    // Get a single currency by id
    const currency = await client.getCurrency('BTC');
    console.log('Currency (BTC): ', currency);

    // Get all known trading pairs
    const tradingPairs = await client.getAllTradingPairs();
    console.log('Trading Pairs: ', tradingPairs);

    // Get all product volume
    const productVolume = await client.getAllProductVolume();
    console.log('Product Volume: ', productVolume);

    // Get all wrapped assets
    const wrappedAssets = await client.getAllWrappedAssets();
    console.log('Wrapped Assets: ', wrappedAssets);
  } catch (e) {
    console.error('Error: ', e);
  }
}

publicExchangeCalls();
