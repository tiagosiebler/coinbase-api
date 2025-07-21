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
