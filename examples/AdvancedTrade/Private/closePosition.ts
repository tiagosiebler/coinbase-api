import { CBAdvancedTradeClient } from '../../../src/index.js';

/**
 * import { CBAdvancedTradeClient } from 'coinbase-api';
 * const { CBAdvancedTradeClient } = require('coinbase-api');
 */

// initialise the client
/**
 *
 * You can add both ED25519 and ECDSA keys, client will recognize both types of keys
 *
 * ECDSA:
 *
 * {
 *   apiKey: 'organizations/your_org_id/apiKeys/your_api_key_id',
 *   apiSecret:
 *     '-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIPT/TTZPxw0kDGvpuCENJp9A4/2INAt9/QKKfyidTWM8oAoGCCqGSM49\nAwEHoUQDQgAEd+cnxrKl536ly5eYBi+8dvXt1MJXYRo+/v38h9HrFKVGBRndU9DY\npV357xIfqeJEzb/MBuk3EW8cG9RTrYBwjg==\n-----END EC PRIVATE KEY-----\n',
 * }
 *
 * ED25519:
 * {
 *   apiKey: 'your-api-key-id',
 *   apiSecret: 'yourExampleApiSecretEd25519Version==',
 * }
 *
 *
 */
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
