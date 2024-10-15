const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /users/{user_id}/trading-volumes
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L846

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getUserTradingVolume(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
