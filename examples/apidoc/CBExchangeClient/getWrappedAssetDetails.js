const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /wrapped-assets/{wrapped_asset_id}
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L903

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getWrappedAssetDetails(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
