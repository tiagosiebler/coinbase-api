import { CBAdvancedTradeClient } from '../../../src/index.js';
// import { CBAdvancedTradeClient } from 'coinbase-api';

// initialise the client
const client = new CBAdvancedTradeClient({
  apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
  apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
});

async function getOrders() {
  try {
    // Get all orders
    const orders = await client.getOrders({ limit: 5 });
    console.log('Orders: ', orders);

    // Get order details
    if (orders.orders.length > 0) {
      const orderId = orders.orders[0].order_id;
      const orderDetails = await client.getOrder({ order_id: orderId });
      console.log('Order Details: ', orderDetails);
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

getOrders();
