import { CBAppClient } from '../../../src/index.js';
// import { CBAppClient } from 'coinbase-api';

// Initialize the client
const client = new CBAppClient({
  apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
  apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
});

async function depositFunds() {
  try {
    // Deposit funds to your fiat account
    const depositResult = await client.depositFunds({
      account_id: 'your_fiat_account_id',
      amount: '100.00',
      currency: 'USD',
      payment_method: 'your_payment_method_id',
    });
    console.log('Deposit Result: ', depositResult);
  } catch (e) {
    console.error('Deposit funds error: ', e);
  }
}

depositFunds();
