import { CBExchangeClient } from '../../src/index.js';

/**
 * import { CBAdvancedTradeClient } from 'coinbase-api';
 * const { CBAdvancedTradeClient } = require('coinbase-api');
 */

// Initialize the client, you can pass in api keys here if you have them but they are not required for public endpoints
const client = new CBExchangeClient({
  apiKey: 'yourAPIKeyHere',
  apiSecret: 'yourAPISecretHere',
  //This is the passphrase you provided when creating this API key. NOT your account password.
  apiPassphrase: 'yourAPIPassPhraseHere',

  // Optional, connect to sandbox instead: https://public-sandbox.exchange.coinbase.com/apikeys
  // useSandbox: true,
});

async function privateExchangeCalls() {
  try {
    const orders = await client.getOrders();
    console.log('Orders: ', orders);

    const order = await client.getOrder({
      order_id: '0c892cb3-2824-4662-8be3-99c8e879f606',
      market_type: 'market',
    });
    console.log('Order: ', order);

    const cancelOrderResult = await client.cancelOrder({
      order_id: '0c892cb3-2824-4662-8be3-99c8e879f606',
      product_id: 'BTC-GBP',
    });
    console.log('cancelOrder result: ', cancelOrderResult);
  } catch (e) {
    console.error('Error: ', e);
  }
}

privateExchangeCalls();
