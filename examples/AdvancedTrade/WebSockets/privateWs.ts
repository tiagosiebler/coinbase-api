import {
  // DefaultLogger,
  WebsocketClient,
  // WS_KEY_MAP,
  WsTopicRequest,
} from '../../../src/index.js';

/**
 * import { WebsocketClient } from 'coinbase-api';
 * const { WebsocketClient } = require('coinbase-api');
 */

async function start() {
  // key name & private key, as returned by coinbase when creating your API keys.
  // Note: the below example is a dummy key and won't actually work

  // Optional: fully customise the logging experience by injecting a custom logger
  // const logger: typeof DefaultLogger = {
  //   ...DefaultLogger,
  //   trace: (...params) => {
  //     if (
  //       [
  //         'Sending ping',
  //         'Sending upstream ws message: ',
  //         'Received pong, clearing pong timer',
  //         'Received ping, sending pong frame',
  //       ].includes(params[0])
  //     ) {
  //       return;
  //     }
  //     console.log('trace', params);
  //   },
  // };

  const client = new WebsocketClient(
    {
      // Either pass the full JSON object that can be downloaded when creating your API keys
      // cdpApiKey: advancedTradeCdpAPIKey,

      // initialise the client
      /**
       *
       * You can add both ED25519 and ECDSA keys, client will recognize both types of keys
       *
       * ECDSA:
       *
       * {
       *   apiKey: 'organizations/your_org_id/apiKeys/your_api_key_id',
       *   apiSecret:
       *     '-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIPT/TTZPxw0kDGvpuCENJp9A4/2INAt9/QKKfyidTWM8oAoGCCqGSM49\nAwEHoUQDQgAEd+cnxrKl536ly5eYBi+8dvXt1MJXYRo+/v38h9HrFKVGBRndU9DY\npV357xIfqeJEzb/MBuk3EW8cG9RTrYBwjg==\n-----END EC PRIVATE KEY-----\n',
       * }
       *
       * ED25519:
       * {
       *   apiKey: 'your-api-key-id',
       *   apiSecret: 'yourExampleApiSecretEd25519Version==',
       * }
       *
       *
       */
      apiKey: process.env.API_KEY_NAME || 'insert_api_key_here',
      apiSecret: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
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
    // throw new Error('res?');
  });

  client.on('exception', (data) => {
    console.error('exception: ', data);
  });

  try {
    /**
     * Use the client subscribe(topic, market) pattern to subscribe to any websocket topic.
     *
     * You can subscribe to topics one at a time or many one one request.
     *
     * Topics can be sent as simple strings, if no parameters are required.
     *
     * Any subscribe requests on the "advTradeUserData" market are automatically authenticated with the available credentials
     */
    // client.subscribe('heartbeats', 'advTradeUserData');
    client.subscribe('futures_balance_summary', 'advTradeUserData');
    // This is the same as above, but uses WS_KEY_MAP as an enum (do this if you're not sure what value to put)
    // client.subscribe('futures_balance_summary', WS_KEY_MAP.advTradeUserData);

    // Subscribe to the user feed for the advanced trade websocket
    client.subscribe('user', 'advTradeUserData');

    // /**
    //  * Or, as an array of simple strings.
    //  *
    //  * Any requests sent to the "advTradeUserData" wsKey are
    //  * automatically authenticated, if API keys are avaiable:
    //  */
    // client.subscribe(
    //   ['futures_balance_summary', 'user'],
    //   'advTradeUserData',
    // );

    /**
     * Or send a more structured object with parameters, e.g. if parameters are required
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tickerSubscribeRequest: WsTopicRequest = {
      topic: 'futures_balance_summary',
      /**
       * Anything in the payload will be merged into the subscribe "request",
       * allowing you to send misc parameters supported by the exchange (such as `product_ids: string[]`)
       */
      payload: {
        // In this case, the "futures_balance_summary" channel doesn't support any parameters
        // product_ids: ['ETH-USD', 'BTC-USD'],
      },
    };
    client.subscribe(tickerSubscribeRequest, 'advTradeUserData');
  } catch (e) {
    console.error('Subscribe exception: ', e);
  }
}

start();
