import 'dotenv/config';

import { WebsocketClient, WsTopicRequest } from '../../src/index.js';

/**
 * import { WebsocketClient, WsTopicRequest } from 'coinbase-api';
 * const { WebsocketClient, WsTopicRequest } = require('coinbase-api');
 */

const client = new WebsocketClient(
  {
    apiKey: process.env.CB_INTX_API_KEY!,
    apiSecret: process.env.CB_INTX_API_SECRET!,
    apiPassphrase: process.env.CB_INTX_API_PASSPHRASE!,
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

const OrderbookSubscribeRequest: WsTopicRequest = {
  topic: 'LEVEL1', // ws topic
  /**
   * Anything in the payload will be merged into the subscribe "request",
   * allowing you to send misc parameters supported by the exchange (such as `product_ids: string[]`)
   */
  payload: {
    product_ids: ['BTC-PERP'],
  },
};
client.subscribe(OrderbookSubscribeRequest, 'internationalMarketData');
