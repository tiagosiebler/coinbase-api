const { CBExchangeClient } = require('coinbase-api');

  // ENDPOINT: /withdrawals/payment-method
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBExchangeClient.ts#L352

const client = new CBExchangeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.withdrawToPaymentMethod(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
