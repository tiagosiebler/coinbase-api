const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /users/{user_id}/exchange-limits
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L822

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getUserExchangeLimits(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
