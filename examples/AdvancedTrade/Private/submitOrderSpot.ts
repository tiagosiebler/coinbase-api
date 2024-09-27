import { CBAdvancedTradeClient } from '../../../src/index.js';

/**
 * import { CBAdvancedTradeClient } from 'coinbase-api';
 * const { CBAdvancedTradeClient } = require('coinbase-api');
 */

// initialise the client
const client = new CBAdvancedTradeClient({
  apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
  apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
});

async function submitOrder() {
  try {
    // submit market spot order
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
    // Submit limit spot order
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
