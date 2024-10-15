const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /loans/lending-overview
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L501

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getLendingOverview(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
