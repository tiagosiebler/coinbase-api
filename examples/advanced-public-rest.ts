import { AdvancedTradeClient } from '../src/AdvancedTradeClient.js';

const advancedTradeClient = new AdvancedTradeClient({});

async function main() {
  const res = await advancedTradeClient.getPublicProductBook({
    product_id: 'BTC-USD',
  });

  console.log(res.pricebook);
}

main();
