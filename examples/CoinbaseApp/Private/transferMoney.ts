import { CBAppClient } from '../../../src/index.js';
// import { CBAppClient } from 'coinbase-api';

// Initialize the client
const client = new CBAppClient({
  apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
  apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
});

async function transferMoney() {
  try {
    // Transfer money between your own accounts
    const transferMoneyResult = await client.transferMoney({
      account_id: 'your_source_account_id',
      type: 'transfer',
      to: 'your_destination_account_id',
      amount: '0.01',
      currency: 'BTC',
    });
    console.log('Transfer Money Result: ', transferMoneyResult);
  } catch (e) {
    console.error('Transfer money error: ', e);
  }
}

transferMoney();
