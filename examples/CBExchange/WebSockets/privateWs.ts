import { WebsocketClient } from '../../../src/index.js';

/**
 * import { WebsocketClient } from 'coinbase-api';
 * const { WebsocketClient } = require('coinbase-api');
 */

async function start() {
  const client = new WebsocketClient(
    {
      apiKey: 'yourAPIKeyHere',
      apiSecret: 'yourAPISecretHere',
      //This is the passphrase you provided when creating this API key. NOT your account password.
      apiPassphrase: 'yourAPIPassPhraseHere',
      // Optional, connect to sandbox instead: https://public-sandbox.exchange.coinbase.com/apikeys
      // useSandbox: true,
    },
    // logger,
  );

  client.on('open', (data) => {
    console.log('open: ', data?.wsKey);
  });

  // Data received
  client.on('update', (data) => {
    console.info(new Date(), 'data received: ', JSON.stringify(data));
  });

  // Something happened, attempting to reconenct
  client.on('reconnect', (data) => {
    console.log('reconnect: ', data);
  });

  // Reconnect successful
  client.on('reconnected', (data) => {
    console.log('reconnected: ', data);
  });

  // Connection closed. If unexpected, expect reconnect -> reconnected.
  client.on('close', (data) => {
    console.error('close: ', data);
  });

  // Reply to a request, e.g. "subscribe"/"unsubscribe"/"authenticate"
  client.on('response', (data) => {
    console.info('response: ', JSON.stringify(data, null, 2));
  });

  client.on('exception', (data) => {
    console.error('exception: ', data);
  });

  try {
    /**
     * Use the client subscribe(topic, market) pattern to subscribe to any websocket topic.
     * - You can subscribe to topics one at a time or many one one request.
     * - Topics can be sent as simple strings, if no parameters are required.
     * - If parameters are required, pass them in the "payload" property - they will be merged into the subscription request automatically
     * - Any subscribe requests on the "exchangeDirectMarketData" market are automatically authenticated with the available credentials
     */
    client.subscribe(
      {
        topic: 'full',
        payload: {
          product_ids: ['BTC-USD'],
        },
      },
      'exchangeDirectMarketData',
    );

    client.subscribe(
      {
        topic: 'balance',
        payload: {
          account_ids: [
            'd50ec984-77a8-460a-b958-66f114b0de9b',
            'd50ec984-77a8-460a-b958-66f114b0de9a',
          ],
        },
      },
      'exchangeDirectMarketData',
    );

    /**
     * Other examples for some of the authenticated Coinbase Exchange "direct market data" channels:
     */
    client.subscribe(
      [
        // https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#full-channel
        {
          topic: 'full',
          payload: {
            product_ids: ['BTC-USD'],
          },
        },
        // https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#user-channel
        {
          topic: 'user',
          payload: {
            product_ids: ['BTC-USD'],
          },
        },
        // https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level2-channel
        {
          topic: 'level2',
          payload: {
            product_ids: ['BTC-USD'],
          },
        },
        // https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#balance-channel
        {
          topic: 'balance',
          payload: {
            account_ids: [
              'd50ec984-77a8-460a-b958-66f114b0de9b',
              'd50ec984-77a8-460a-b958-66f114b0de9a',
            ],
          },
        },
      ],
      'exchangeDirectMarketData',
    );
  } catch (e) {
    console.error(`Subscribe exception: `, e);
  }
}

start();
