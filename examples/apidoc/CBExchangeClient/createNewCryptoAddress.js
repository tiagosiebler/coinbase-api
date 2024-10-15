const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /coinbase-accounts/{account_id}/addresses
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L177

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.createNewCryptoAddress(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
