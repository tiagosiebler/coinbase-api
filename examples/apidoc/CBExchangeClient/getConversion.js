const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /conversions/{conversion_id}
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L213

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getConversion(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
