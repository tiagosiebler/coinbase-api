const { CBAdvancedTradeClient } = require('coinbase-api');

  // ENDPOINT: /api/v3/brokerage/portfolios/{portfolio_uuid}
  // METHOD: PUT
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L422

const client = new CBAdvancedTradeClient({
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
