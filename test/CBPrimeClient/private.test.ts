import { CBPrimeClient } from '../../src/index.js';

describe.skip('CBPrimeClient PRIVATE', () => {
  const account = {
    key: process.env.CB_PRIME_API_KEY_NAME,
    secret: process.env.CB_PRIME_API_PRIVATE_KEY,
    passphrase: process.env.CB_PRIME_API_PASSPHRASE,
  };

  const rest = new CBPrimeClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,
  });

  let portfolioId: string;

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
  });

  describe('private endpoints', () => {
    describe('GET requests', () => {
      test('without params', async () => {
        const res = await rest.getPortfolios();
        expect(res).toMatchObject({
          portfolios: expect.any(Array),
        });
        portfolioId = res.portfolios[0].id;
      });

      test('with params', async () => {
        const res = await rest.getPortfolioById({ portfolio_id: portfolioId });
        expect(res).toMatchObject({
          portfolio: expect.any(Object),
        });
      });
    });

    describe('POST requests', () => {
      test('with params as request body', async () => {
        try {
          const res = await rest.getOrderPreview({
            portfolio_id: portfolioId,
            side: 'BUY',
            product_id: 'BTC-USDT',
            type: 'MARKET',
            quote_value: '1',
          });

          console.log(`res "${expect.getState().currentTestName}"`, res);
          expect(res).toMatchObject({
            whatever: true,
          });
        } catch (e: any) {
          // These are deliberatly restricted API keys. If the response is a permission error, it confirms the sign + request was OK and permissions were denied.
          // console.log(`err "${expect.getState().currentTestName}"`, e?.body);
          //console.log('Error, CBPrime, post req:', e);
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
