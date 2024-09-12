import { CoinbaseInternational } from '../src/CoinbaseInternational.js';

const coinbaseInternational = new CoinbaseInternational({});

async function main() {
  try {
    const res1 = await coinbaseInternational.getAssetDetails({ asset: 'BTC' });

    console.log(res1);
  } catch (error) {
    console.error(error);
  }
}

main();
