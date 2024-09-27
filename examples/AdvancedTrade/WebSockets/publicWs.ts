import {
  // DefaultLogger,
  WebsocketClient,
  WsTopicRequest,
} from '../../../src/index.js';

/**
 * import { WebsocketClient } from 'coinbase-api';
 * const { WebsocketClient } = require('coinbase-api');
 */

async function start() {
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
  // const client = new WebsocketClient({}, logger);

  const client = new WebsocketClient();

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
     * Topics can be sent as simple strings, if no parameters are required:
     */
    // client.subscribe('heartbeats', 'advTradeMarketData');
    // client.subscribe('futures_balance_summary', 'advTradeUserData');

    // /**
    //  * Or, as an array of simple strings.
    //  *
    //  * Any requests sent to the "advTradeUserData" wsKey are
    //  * automatically authenticated, if API keys are avaiable:
    //  */
    // client.subscribe(
    //   ['heartbeats', 'futures_balance_summary'],
    //   'advTradeUserData',
    // );

    /**
     * Or send a more structured object with parameters, e.g. if parameters are required
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tickerSubscribeRequest: WsTopicRequest = {
      topic: 'ticker',
      /**
       * Anything in the payload will be merged into the subscribe "request",
       * allowing you to send misc parameters supported by the exchange (such as `product_ids: string[]`)
       */
      payload: {
        product_ids: ['ETH-USD', 'BTC-USD'],
      },
    };
    client.subscribe(tickerSubscribeRequest, 'advTradeMarketData');

    /**
     * Subscribe to the "status" topic for a few symbols
     */
    client.subscribe(
      {
        topic: 'status',
        payload: {
          product_ids: ['ETH-USD', 'BTC-USD'],
        },
      },
      'advTradeMarketData',
    );

    /**
     * To subscribe to more product IDs for the same topic, just send an additional request:
     */
    client.subscribe(
      {
        topic: 'status',
        payload: {
          product_ids: ['XRP-USD'],
        },
      },
      'advTradeMarketData',
    );

    // /**
    //  * Or, send an array of structured objects with parameters, if you wanted to send multiple in one request
    //  */
    // // client.subscribe([level2SubscribeRequest, anotherRequest, etc], 'advTradeMarketData');

    /**
     * Other adv trade public websocket topics:
     */
    client.subscribe(
      [
        {
          topic: 'heartbeats',
        },
        {
          topic: 'candles',
          payload: {
            product_ids: ['ETH-USD'],
          },
        },
        {
          topic: 'market_trades',
          payload: {
            product_ids: ['ETH-USD', 'BTC-USD'],
          },
        },
        {
          topic: 'status',
          payload: {
            product_ids: ['ETH-USD', 'BTC-USD'],
          },
        },
        {
          topic: 'ticker',
          payload: {
            product_ids: ['ETH-USD', 'BTC-USD'],
          },
        },
        {
          topic: 'ticker_batch',
          payload: {
            product_ids: ['ETH-USD', 'BTC-USD'],
          },
        },
        {
          topic: 'level2',
          payload: {
            product_ids: ['ETH-USD', 'BTC-USD'],
          },
        },
      ],
      'advTradeMarketData',
    );
  } catch (e) {
    console.error(`Subscribe exception: `, e);
  }
}

start();
