import { CBExchangeClient } from '../../src/index.js';

describe('CBExchangeClient PRIVATE', () => {
  const account = {
    key: process.env.CB_EXCHANGE_API_KEY,
    secret: process.env.CB_EXCHANGE_API_SECRET,
    passphrase: process.env.CB_EXCHANGE_API_PASSPHRASE,
    useSandbox: process.env.CB_EXCHANGE_USE_SANDBOX === 'true',
  };

  const rest = new CBExchangeClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,
    useSandbox: account.useSandbox,
  });

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
  });

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getProductBook({ product_id: 'BTC-USD' });
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
          usd_volume: expect.any(Object),
        });
      });

      test('with params', async () => {
        const res = await rest.getTransfers({ type: 'deposit' });
        // console.log(`res "${expect.getState().currentTestName}"`, res);

        expect(res).toEqual(expect.arrayContaining([expect.any(Object)]));
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
          // These are deliberately restricted API keys. If the response is a permission error, it confirms the sign + request was OK and permissions were denied.
          // console.log(`err "${expect.getState().currentTestName}"`, e?.body);
          // console.log(`Error, "${expect.getState().currentTestName}"`, e);

          const responseBody = e?.body;
          expect(responseBody).toMatchObject({
            message: 'Forbidden',
          });
        }
      });
    });
  });
});
