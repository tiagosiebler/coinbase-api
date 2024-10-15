const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /products/{product_id}/trades
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L662

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getProductTrades(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
