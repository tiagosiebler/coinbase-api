import { AdvancedTradeClient } from '../src/AdvancedTradeClient.js';

const advancedTradeClient = new AdvancedTradeClient({});

async function main() {
  try {
    /*  const res = await advancedTradeClient.getPublicProductBook({
      product_id: 'BTC-USD',
    });

    const res2 = await advancedTradeClient.listPublicProducts({});

    const res3 = await advancedTradeClient.getPublicProduct({
      product_id: 'BTC-USD',
    });

    const res4 = await advancedTradeClient.getPublicProductCandles({
      product_id: 'BTC-USD',
      granularity: 'ONE_MINUTE',
      start: '1725976550',
      end: '1725977550',
    }); */

    const res5 = await advancedTradeClient.getPublicMarketTrades({
      product_id: 'BTC-USD',
      limit: 10,
    });

    console.log(res5);
  } catch (error) {
    console.error(error);
  }
}

main();
