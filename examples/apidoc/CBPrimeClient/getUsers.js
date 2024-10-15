const { CBPrimeClient } = require('coinbase-api');

  // ENDPOINT: /v1/entities/{entity_id}/users
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L195

const client = new CBPrimeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getUsers(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
