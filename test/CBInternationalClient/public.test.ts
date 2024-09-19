import { CBInternationalClient } from '../../src/index.js';

describe('CBInternationalClient PUBLIC', () => {
  const rest = new CBInternationalClient();

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getHistoricalFundingRates({
        instrument: 'BTC-PERP',
      });
      console.log(res);
      expect(res).toMatchObject({
        pagination: expect.any(Object),
        results: expect.any(Array),
      });
    });
  });
});
