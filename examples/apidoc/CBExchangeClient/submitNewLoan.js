const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /loans/open
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L525

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.submitNewLoan(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
