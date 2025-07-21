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
