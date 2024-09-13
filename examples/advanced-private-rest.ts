import { CBAdvancedTradeClient } from '../src/index.js';

async function main() {
  const client = new CBAdvancedTradeClient({
    // cdpApiKey: credsTradePermission,
    apiKeyName: '',
    apiPrivateKey: '',
  });

  try {
    /* const accounts = await client.getAccounts();
    console.log('req result: ', accounts.accounts[0].uuid); */

    const newOrder = await client.submitOrder({
      product_id: 'BTC-USDT',
      order_configuration: { market_market_ioc: { base_size: '20' } },
      side: 'BUY',
    });
    console.log('req result: ', newOrder);
  } catch (e) {
    console.error('req exception: ', e);
  }

  //
}

main();
