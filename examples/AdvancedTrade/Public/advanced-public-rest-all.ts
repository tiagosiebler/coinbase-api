import { CBAdvancedTradeClient } from '../../../src/index.js';

/**
 * import { CBAdvancedTradeClient } from 'coinbase-api';
 * const { CBAdvancedTradeClient } = require('coinbase-api');
 */

// you can initialise public client without api keys as public calls do not require auth
const client = new CBAdvancedTradeClient({});

async function publicCalls() {
  try {
    // Get server time
    const serverTime = await client.getServerTime();
    console.log('Server Time: ', serverTime);

    // Get public product book
    const productBook = await client.getPublicProductBook({
      product_id: 'BTC-USD',
      limit: 10,
    });
    console.log('Public Product Book: ', productBook);

    // List all public products
    const publicProducts = await client.getPublicProducts();
    console.log('Public Products: ', publicProducts);

    // Get single public product
    const publicProduct = await client.getPublicProduct({
      product_id: 'BTC-USD',
    });
    console.log('Public Product: ', publicProduct);

    // Get public product candles
    const productCandles = await client.getPublicProductCandles({
      product_id: 'BTC-USD',
      granularity: 'ONE_MINUTE',
      start: '1725976550',
      end: '1725977550',
    });
    console.log('Public Product Candles: ', productCandles);

    // Get public market trades
    const marketTrades = await client.getPublicMarketTrades({
      product_id: 'BTC-USD',
      limit: 10,
    });
    console.log('Public Market Trades: ', marketTrades);
  } catch (e) {
    console.error('Error: ', e);
  }
}

publicCalls();
