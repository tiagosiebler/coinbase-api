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
  const advancedTradeCdpAPIKey = {
    name: process.env.API_KEY_NAME || 'insert_api_key_here',
    privateKey: process.env.API_PRIVATE_KEY || 'insert_api_secret_here',
  };

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

      // Or use the key name as "apiKey" and private key (WITH the "begin/end EC PRIVATE KEY" comment) as "apiSecret"
      apiKey: advancedTradeCdpAPIKey.name,
      apiSecret: advancedTradeCdpAPIKey.privateKey,
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
