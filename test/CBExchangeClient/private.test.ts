import { CBExchangeClient } from '../../src/index.js';

describe('CBExchangeClient PRIVATE', () => {
  const account = {
    key: process.env.API_KEY_NAME,
    secret: process.env.API_PRIVATE_KEY,
    passphrase: process.env.API_PASSPHRASE,
  };

  const rest = new CBExchangeClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,
  });

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
  });

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getProductBook({ product_id: 'BTC-USDT' });
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

  describe('private endpoints', () => {
    describe('GET requests', () => {
      test('without params', async () => {
        const res = await rest.getFees();
        expect(res).toMatchObject({
          taker_fee_rate: expect.any(String),
          maker_fee_rate: expect.any(String),
          usd_volume: expect.any(String),
        });
      });

      test('with params', async () => {
        const res = await rest.getNewLoanPreview({
          currency: 'USDC',
          native_amount: '100',
        });
        //console.log('res with params', res);
        expect(res).toMatchObject({
          overview: expect.any(Object),
          loans: expect.any(Array),
        });
      });
    });

    describe('POST requests', () => {
      test('with params as request body', async () => {
        try {
          const res = await rest.createProfile({
            name: 'testProfile',
          });

          console.log(`res "${expect.getState().currentTestName}"`, res);
          expect(res).toMatchObject({
            whatever: true,
          });
        } catch (e: any) {
          // These are deliberatly restricted API keys. If the response is a permission error, it confirms the sign + request was OK and permissions were denied.
          // console.log(`err "${expect.getState().currentTestName}"`, e?.body);
          console.log('Error, CBExchange, post req:', e);
          const responseBody = e?.body;
          expect(responseBody).toMatchObject({
            message: 'Unauthorized.',
          });
        }
      });
    });
  });
});
