import { CBAppClient } from '../../../src/index.js';

/**
 * import { CBAppClient } from 'coinbase-api';
 * const { CBAppClient } = require('coinbase-api');
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
