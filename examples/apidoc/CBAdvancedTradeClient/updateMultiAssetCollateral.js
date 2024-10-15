const { CBAdvancedTradeClient } = require('coinbase-api');

  // ENDPOINT: /api/v3/brokerage/intx/multi_asset_collateral
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBAdvancedTradeClient.ts#L650

const client = new CBAdvancedTradeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.updateMultiAssetCollateral(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
