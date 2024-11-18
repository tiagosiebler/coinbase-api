const { CBExchangeClient } = require('coinbase-api');

  // This example shows how to call this coinbase API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "coinbase-api" for coinbase exchange
  // This coinbase API SDK is available on npm via "npm install coinbase-api"
  // ENDPOINT: /deposits/payment-method
  // METHOD: POST
  // PUBLIC: NO

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.depositFromPaymentMethod(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });