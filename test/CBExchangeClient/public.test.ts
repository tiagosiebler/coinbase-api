import { CBExchangeClient } from '../../src/index.js';
import { getTestProxy } from '../proxy.util.js';

describe('CBExchangeClient PUBLIC', () => {
  const rest = new CBExchangeClient({}, getTestProxy());

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getProductBook({ product_id: 'BTC-USD' });
      //console.log(res);
      expect(res).toMatchObject({
        bids: expect.any(Array),
        asks: expect.any(Array),
        sequence: expect.any(Number),
        auction_mode: expect.any(Boolean),
        auction: expect.any(Object),
        time: expect.any(String),
      });
    });
  });
});
