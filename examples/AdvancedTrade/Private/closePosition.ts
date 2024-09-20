import { CBAdvancedTradeClient } from '../../../src/index.js';
// import { CBAdvancedTradeClient } from 'coinbase-api';

// initialise the client
const client = new CBAdvancedTradeClient({
  apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
  apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
});

// this function is suggested to used with spot market orders
// If you want to close futures, it is recommended to use submitOrder() with the opposite side of the current position

/* Closing Futures Positions - Exchange docs
When a contract expires, we automatically close your open position at the exchange settlement price. 
You can also close your position before the contract expires 
(for example, you may want to close your position if you’ve reached your profit target, 
you want to prevent further losses, or you need to satisfy a margin requirement).

There are two ways to close your futures positions: 
(1) Close your position with this endpoint, or 
(2) Create a separate trade to take the opposite position in the same futures contract you are currently holding in your account. 
For example, to close an open long position in the BTC 23 Feb 24 contract, place an order to sell the same number of BTC 23 Feb 24 contracts. 
If you were short to begin with, go long the same number of contracts to close your position.

More info on https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_closeposition#closing-futures-positions */

async function closePosition() {
  try {
    // close position
    const closePosition = await client.closePosition({
      product_id: 'BTC-USD',
      size: '0.1',
      client_order_id: client.generateNewOrderId(),
    });
    console.log('Result: ', closePosition);
  } catch (e) {
    console.error('Send new order error: ', e);
  }

  //
}

closePosition();
