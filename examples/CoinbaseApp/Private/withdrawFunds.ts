import { CBAppClient } from '../../../src/index.js';
// import { CBAppClient } from 'coinbase-api';

// Initialize the client
const client = new CBAppClient({
  apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
  apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
});

async function withdrawFunds() {
  try {
    // Withdraw funds from your fiat account
    const withdrawResult = await client.withdrawFunds({
      account_id: 'your_fiat_account_id',
      amount: '50.00',
      currency: 'USD',
      payment_method: 'your_payment_method_id',
    });
    console.log('Withdraw Result: ', withdrawResult);
  } catch (e) {
    console.error('Withdraw funds error: ', e);
  }
}

withdrawFunds();
