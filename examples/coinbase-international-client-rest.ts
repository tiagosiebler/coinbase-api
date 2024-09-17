import { CBInternationalClient } from '../src/index.js';

const coinbaseInternational = new CBInternationalClient();

async function main() {
  try {
    const res1 = await coinbaseInternational.getAssetDetails({ asset: 'BTC' });

    console.log(res1);
  } catch (error) {
    console.error(error);
  }
}

main();
