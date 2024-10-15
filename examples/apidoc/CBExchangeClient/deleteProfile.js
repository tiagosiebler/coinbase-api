const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /profiles/{profile_id}/deactivate
  // METHOD: PUT
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L731

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.deleteProfile(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
