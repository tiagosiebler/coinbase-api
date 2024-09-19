import { CBExchangeClient } from '../../src/index.js';

describe('CBExchangeClient PRIVATE', () => {
  const account = {
    key: process.env.API_KEY_NAME_EXCH,
    secret: process.env.API_PRIVATE_KEY_EXCH,
    passphrase: process.env.API_PASSPHRASE_EXCH,
  };

  const rest = new CBExchangeClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,
    useSandbox: true,
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
        const res = await rest.submitOrder({
          product_id: 'BTC-GBP',
          price: '1000',
          side: 'buy',
          type: 'limit',
          size: '0.001',
        });
        console.log('res with params', res);
        expect(res).toMatchObject({
          id: expect.any(String),
          price: expect.any(String),
          size: expect.any(String),
          product_id: expect.any(String),
          side: expect.any(String),
          type: expect.any(String),
          time_in_force: expect.any(String),
          post_only: expect.any(Boolean),
          created_at: expect.any(String),
          fill_fees: expect.any(String),
          filled_size: expect.any(String),
          executed_value: expect.any(String),
          status: expect.any(String),
          settled: expect.any(Boolean),
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
            message: 'Forbidden',
          });
        }
      });
    });
  });
});
