const { CBAppClient } = require('coinbase-api');

  // ENDPOINT: /v2/prices/{currencyPair}/spot
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L465

const client = new CBAppClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSpotPrice(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
