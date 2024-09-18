import { CBAppClient } from '../../src/index.js';

describe('CBAppClient PUBLIC', () => {
  const rest = new CBAppClient();

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getFiatCurrencies();
      expect(res).toMatchObject({
        data: expect.any(Array),
      });
    });
  });
});
