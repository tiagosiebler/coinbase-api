const { CBAppClient } = require('coinbase-api');

  // ENDPOINT: /v2/prices/{currencyPair}/buy
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L435

const client = new CBAppClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getBuyPrice(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
