const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /withdrawals/crypto
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L331

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.withdrawToCryptoAddress(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
