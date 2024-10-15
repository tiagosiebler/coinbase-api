const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /loans/loan-preview
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L512

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getNewLoanPreview(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
