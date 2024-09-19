/* eslint-disable @typescript-eslint/no-unused-vars */

import { CBExchangeClient } from '../src/index.js';

(async () => {
  //console.clear();

  const credsViewPermission = {
    key: '6e0a73cfd6e02701655d38a383dc5fcf',
    secret:
      'g1uvHV/QklP+wB+cWoGXdCOYmQ5BQ1/XYMCaLDs2rH7bZ7V07X3ECroC0Zb6H5aBSa0CkMc/WMzpz5RHvqpxFQ==',
    passphrase: 'gdgjgehg3i',
  };

  const client = new CBExchangeClient({
    apiKey: credsViewPermission.key,
    apiSecret: credsViewPermission.secret,
    apiPassphrase: credsViewPermission.passphrase,
    useSandbox: true,
  });

  try {
    /* const res = await client.getNewLoanPreview({
      currency: 'USDC',
      native_amount: '100',
    });
    console.log('req result: ', res);  */

    /*  const res = await client.getProfiles({ active: true });
    console.log('req result: ', res); */
    /* const accounts = await client.getAccounts();
    console.log('req result: ', accounts); */
    const order = await client.submitOrder({
      product_id: 'BTC-GBP',
      price: '1000',
      side: 'buy',
      type: 'limit',
      size: '0.001',
    });

    console.log('order', order);

    const res = await client.getOrder({
      order_id: '2e9a5d90-84f7-4267-a6e5-722b9d43e2d0',
    });
    console.log('order', res);
    // console.log('res', res);
    // const res = await client.cancelOrder({ order_id: 'dummyorder' });
    // console.log('cancelOrder result: ', res);
    // const orderReq: SubmitAdvTradeOrderRequest = {
    //   product_id: 123123,
    // };
    // const orderRes = await client.submitOrder({
    //   product_id: 12312312, // this should throw???
    // });
  } catch (e) {
    console.error('req exception: ', JSON.stringify(e, null, 2));
  }

  //
})();
