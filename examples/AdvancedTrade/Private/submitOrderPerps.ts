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

async function submitOrder() {
  try {
    // submit market futures order
    const newOrder = await client.submitOrder({
      product_id: 'BTC-USDT',
      order_configuration: { market_market_ioc: { base_size: '0.001' } },
      side: 'SELL',
      client_order_id: client.generateNewOrderId(),
    });
    console.log('Result: ', newOrder);
  } catch (e) {
    console.error('Send new order error: ', e);
  }

  //
}

async function submitLimitOrder() {
  try {
    // Submit limit futures order
    const limitOrder = await client.submitOrder({
      product_id: 'BTC-USDT',
      order_configuration: {
        limit_limit_gtc: {
          base_size: '0.001',
          limit_price: '50000.00',
        },
      },
      side: 'BUY',
      client_order_id: client.generateNewOrderId(),
    });
    console.log('Limit Order Result: ', limitOrder);
  } catch (e) {
    console.error('Submit limit order error: ', e);
  }
}

submitLimitOrder();

submitOrder();
