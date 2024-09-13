import { CoinbaseAppClient } from '../src/index.js';

async function main() {
  const client = new CoinbaseAppClient({
    // cdpApiKey: credsTradePermission,
    apiKeyName: '',
    apiPrivateKey: '',
  });

  const res = await client.getAccounts();
  console.log(res);
}

main();
