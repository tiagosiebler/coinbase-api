import { CBInternationalClient } from '../../src/index.js';
import { getTestProxy } from '../proxy.util.js';

describe.skip('CBInternationalClient PRIVATE', () => {
  const account = {
    key: process.env.CB_INTX_API_KEY,
    secret: process.env.CB_INTX_API_SECRET,
    passphrase: process.env.CB_INTX_API_PASSPHRASE,
  };

  const rest = new CBInternationalClient(
    {
      apiKey: account.key,
      apiSecret: account.secret,
      apiPassphrase: account.passphrase,
    },
    getTestProxy(),
  );

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
  });

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getHistoricalFundingRates({
        instrument: 'BTC-PERP',
      });
      //console.log(res);
      expect(res).toMatchObject({
        pagination: expect.any(Object),
        results: expect.any(Array),
      });
    });
  });

  describe('private endpoints', () => {
    describe('GET requests', () => {
      test('without params', async () => {
        const res = await rest.getOpenOrders({});
        expect(res).toMatchObject({
          pagination: expect.any(Object),
          results: expect.any(Array),
        });
      });

      test('with params', async () => {
        const res = await rest.getRankings({ instrument_type: 'spot' });
        expect(res).toMatchObject({
          last_updated: expect.any(String),
          statistics: expect.any(Object),
        });
      });
    });

    describe('POST requests', () => {
      test('with params as request body', async () => {
        try {
          const res = await rest.createPortfolio({
            name: 'testPorftolio',
          });

          console.log(`res "${expect.getState().currentTestName}"`, res);
          expect(res).toMatchObject({
            whatever: true,
          });
        } catch (e: any) {
          // These are deliberately restricted API keys. If the response is a permission error, it confirms the sign + request was OK and permissions were denied.
          // console.log(`err "${expect.getState().currentTestName}"`, e?.body);
          //console.log('Error, CBINTX, post req:', e);
          const responseBody = e?.body;
          expect(responseBody).toMatchObject({
            title: 'Unauthorized',
            status: 401,
            error: 'UNAUTHORIZED',
          });
        }
      });
    });
  });
});
