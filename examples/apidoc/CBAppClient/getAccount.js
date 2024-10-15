const { CBAppClient } = require('coinbase-api');

  // ENDPOINT: /v2/accounts/{account_id}
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L79

const client = new CBAppClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getAccount(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
