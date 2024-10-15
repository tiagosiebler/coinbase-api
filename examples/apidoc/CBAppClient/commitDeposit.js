const { CBAppClient } = require('coinbase-api');

  // ENDPOINT: /v2/accounts/{account_id}/deposits/{deposit_id}/commit
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAppClient.ts#L264

const client = new CBAppClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.commitDeposit(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
