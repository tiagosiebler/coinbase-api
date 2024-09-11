import { AdvancedTradeClient } from '../../src/index.js';

describe('REST PRIVATE', () => {
  const account = {
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
    passphrase: process.env.API_PASSPHRASE,
  };

  const rest = new AdvancedTradeClient({
    apiKeyName: account.key,
    apiPrivateKey: account.secret,
    apiPassphrase: account.passphrase,
  });

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
    expect(account.passphrase).toBeDefined();
  });

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getTickers();
      expect(res.data.ticker).toMatchObject(expect.any(Array));
    });
  });

  describe('private endpoints', () => {
    describe('GET requests', () => {
      test('without params', async () => {
        const res = await rest.getBalances();
        // console.log('res without', res);
        expect(res).toMatchObject({
          code: '200000',
          data: expect.any(Array),
        });
      });

      test('with params', async () => {
        const res = await rest.getBalances({ currency: 'USDT' });
        // console.log('res with', res);
        expect(res).toMatchObject({
          code: '200000',
          data: expect.any(Array),
        });
      });
    });

    describe('POST requests', () => {
      test('with params as request body', async () => {
        try {
          const res = await rest.updateMarginLeverageV3({
            leverage: '1',
            symbol: 'BTC-USDT',
          });

          console.log(`res "${expect.getState().currentTestName}"`, res);
          expect(res).toMatchObject({
            whatever: true,
          });
        } catch (e: any) {
          // These are deliberatly restricted API keys. If the response is a permission error, it confirms the sign + request was OK and permissions were denied.
          // console.log(`err "${expect.getState().currentTestName}"`, e?.body);
          const responseBody = e?.body;
          expect(responseBody).toMatchObject({
            code: '400007',
            msg: expect.stringContaining('more permission'),
          });
        }
      });
    });
  });
});
