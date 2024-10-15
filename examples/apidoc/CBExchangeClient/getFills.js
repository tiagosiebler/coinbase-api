const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /fills
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L383

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getFills(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
