const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /wrapped-assets
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L861

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getAllWrappedAssets(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
