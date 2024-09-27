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

async function getAccounts() {
  try {
    // Get all accounts
    const accounts = await client.getAccounts({ limit: 10 });
    console.log('Accounts: ', accounts);

    // Get specific account details
    if (accounts.accounts.length > 0) {
      const accountId = accounts.accounts[0].uuid;
      const accountDetails = await client.getAccount({ account_id: accountId });
      console.log('Account Details: ', accountDetails);
    }
  } catch (e) {
    console.error('Get accounts error: ', e);
  }
}

getAccounts();
