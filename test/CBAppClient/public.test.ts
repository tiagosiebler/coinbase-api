import { CBAppClient } from '../../src/index.js';
import { getTestProxy } from '../proxy.util.js';

describe('CBAppClient PUBLIC', () => {
  const rest = new CBAppClient({}, getTestProxy());

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getFiatCurrencies();
      expect(res).toMatchObject({
        data: expect.any(Array),
      });
    });
  });
});
