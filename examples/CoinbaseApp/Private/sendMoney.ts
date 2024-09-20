import { CBAppClient } from '../../../src/index.js';
// import { CBAppClient } from 'coinbase-api';

// Initialize the client
const client = new CBAppClient({
  apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
  apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
});

async function sendMoney() {
  try {
    // Send money to another user
    const sendMoneyResult = await client.sendMoney({
      account_id: 'your_crypto_account_id',
      type: 'send',
      to: 'recipient_address_or_email',
      amount: '0.01',
      currency: 'BTC',
    });
    console.log('Send Money Result: ', sendMoneyResult);
  } catch (e) {
    console.error('Send money error: ', e);
  }
}

sendMoney();
