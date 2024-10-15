const { CBPrimeClient } = require('coinbase-api');

  // ENDPOINT: /v1/entities/{entity_id}/payment-methods/{payment_method_id}
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/coinbase-api/blob/master/src/CBPrimeClient.ts#L174

const client = new CBPrimeClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getEntityPaymentMethod(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
