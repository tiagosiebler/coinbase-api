const { CBInternationalClient } = require('coinbase-api');

  // ENDPOINT: /api/v1/portfolios/{portfolio}
  // METHOD: PUT
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L275

const client = new CBInternationalClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.updatePortfolio(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
