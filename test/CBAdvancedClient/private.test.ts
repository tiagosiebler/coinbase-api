import { CBAdvancedTradeClient } from '../../src/index.js';

describe('CBAdvancedTradeClient PRIVATE', () => {
  const account = {
    key: process.env.CB_ADV_API_KEY_NAME,
    secret: process.env.CB_ADV_API_PRIVATE_KEY,
  };

  const rest = new CBAdvancedTradeClient({
    apiKey: account.key,
    apiSecret: account.secret,
  });

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
  });

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getPublicProducts();
      expect(res.products).toMatchObject(expect.any(Array));
    });
  });

  describe('private endpoints', () => {
    describe('GET requests', () => {
      test('without params', async () => {
        const res = await rest.getAccounts();
        // console.log('res without params', res);
        expect(res).toMatchObject({
          accounts: expect.any(Array),
        });
      });

      test('with params', async () => {
        const res = await rest.getMarketTrades({
          product_id: 'BTC-USDT',
          limit: 10,
        });
        //console.log('res with params', res);
        expect(res).toMatchObject({
          trades: expect.any(Array),
          best_bid: expect.any(String),
          best_ask: expect.any(String),
        });
      });
    });

    describe('POST requests', () => {
      test('with params as request body', async () => {
        try {
          const res = await rest.setIntradayMarginSetting({
            setting: 'INTRADAY_MARGIN_SETTING_STANDARD',
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
            error: expect.any(String),
            error_details: 'Missing required scopes',
            message: 'Missing required scopes',
          });
        }
      });
    });
  });
});
