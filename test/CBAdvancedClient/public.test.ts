import { CBAdvancedTradeClient } from '../../src/index.js';

describe('CBAdvancedTradeClient PUBLIC', () => {
  const rest = new CBAdvancedTradeClient();

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getPublicProducts();
      expect(res.products).toMatchObject(expect.any(Array));
    });
  });
});
