const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /reports
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L759

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.createReport(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
