const { CBPrimeClient } = require('coinbase-api');

  // This example shows how to call this coinbase API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "coinbase-api" for coinbase exchange
  // This coinbase API SDK is available on npm via "npm install coinbase-api"
  // ENDPOINT: /v1/allocations/net
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L75

const client = new CBPrimeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.createPortfolioNetAllocations(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
