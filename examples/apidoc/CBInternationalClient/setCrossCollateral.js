const { CBInternationalClient } = require('coinbase-api');

  // ENDPOINT: /api/v1/portfolios/{portfolio}/cross-collateral-enabled
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBInternationalClient.ts#L368

const client = new CBInternationalClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.setCrossCollateral(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
