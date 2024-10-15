const { CBPrimeClient } = require('coinbase-api');

  // ENDPOINT: /v1/portfolios/{portfolio_id}/wallets
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L593

const client = new CBPrimeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.createWallet(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
