const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /wrapped-assets/{wrapped_asset_id}/conversion-rate
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L912

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getWrappedAssetConversionRate(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
