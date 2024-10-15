const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /products/{product_id}/stats
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L644

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getProductStats(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
