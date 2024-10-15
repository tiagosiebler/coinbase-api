const { CBCommerceClient } = require('coinbase-api');

  // ENDPOINT: /charges
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBCommerceClient.ts#L38

const client = new CBCommerceClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.createCharge(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
