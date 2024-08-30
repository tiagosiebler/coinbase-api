import { AdvancedTradeClient } from '../../src/index.js';

describe('REST PUBLIC', () => {
  const rest = new AdvancedTradeClient();

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getTickers();
      expect(res.data.ticker).toMatchObject(expect.any(Array));
    });

    it('should return 24hr stats', async () => {
      const res = await rest.get24hrStats({
        symbol: 'BTC-USDT',
      });

      // console.log('res "${expect.getState().currentTestName}"', res);
      expect(res.data).toMatchObject({
        averagePrice: expect.any(String),
        changePrice: expect.any(String),
        volValue: expect.any(String),
      });
    });
  });
});
