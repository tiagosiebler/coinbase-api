import { WebsocketClient, WsTopicRequest } from '../../../src/index.js';

async function start() {
  /**
   * All websockets are available via the unified WebsocketClient.
   *
   * Below are examples specific to websockets in this product group.
   */
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
     * Topics can be sent as simple strings, if no parameters are required.
     *
     * Coinbase Market Data is the traditional feed which is available without authentication.
     *
     * To use this feed, use 'exchangeMarketData' as the wsKey for each subscription command:
     */
    // client.subscribe('heartbeats', 'exchangeMarketData');
    // client.subscribe('futures_balance_summary', 'exchangeMarketData');

    /**
     * Or send a more structured object with parameters, e.g. if parameters are required
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tickerSubscribeRequst: WsTopicRequest = {
      topic: 'ticker',
      /**
       * Anything in the payload will be merged into the subscribe "request",
       * allowing you to send misc parameters supported by the exchange (such as `product_ids: string[]`)
       */
      payload: {
        product_ids: ['ETH-USD', 'ETH-EUR'],
      },
    };
    client.subscribe(tickerSubscribeRequst, 'exchangeMarketData');

    /**
     * Subscribe to the "heartbeat" topic for a few symbols
     */
    // client.subscribe(
    //   {
    //     topic: 'heartbeat',
    //     payload: {
    //       product_ids: ['ETH-USD', 'BTC-USD'],
    //     },
    //   },
    //   'exchangeMarketData',
    // );

    // client.subscribe(
    //   {
    //     topic: 'level2',
    //     payload: {
    //       product_ids: ['ETH-USD', 'BTC-USD'],
    //     },
    //   },
    //   'exchangeMarketData',
    // );

    // /**
    //  * Or, send an array of structured objects with parameters, if you wanted to send multiple in one request
    //  */
    // // client.subscribe([level2SubscribeRequest, anotherRequest, etc], 'advTradeMarketData');

    /**
     * Other adv trade public websocket topics:
     */
    // client.subscribe(
    //   [
    //     {
    //       topic: 'heartbeats',
    //     },
    //     {
    //       topic: 'candles',
    //       payload: {
    //         product_ids: ['ETH-USD'],
    //       },
    //     },
    //     {
    //       topic: 'market_trades',
    //       payload: {
    //         product_ids: ['ETH-USD', 'BTC-USD'],
    //       },
    //     },
    //     {
    //       topic: 'status',
    //       payload: {
    //         product_ids: ['ETH-USD', 'BTC-USD'],
    //       },
    //     },
    //     {
    //       topic: 'ticker',
    //       payload: {
    //         product_ids: ['ETH-USD', 'BTC-USD'],
    //       },
    //     },
    //     {
    //       topic: 'ticker_batch',
    //       payload: {
    //         product_ids: ['ETH-USD', 'BTC-USD'],
    //       },
    //     },
    //     {
    //       topic: 'level2',
    //       payload: {
    //         product_ids: ['ETH-USD', 'BTC-USD'],
    //       },
    //     },
    //   ],
    //   'exchangeMarketData',
    // );
  } catch (e) {
    console.error(`Subscribe exception: `, e);
  }
}

start();
