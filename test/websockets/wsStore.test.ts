import { isDeepObjectMatch } from '../../src/lib/websocket/WsStore';

describe('WsStore', () => {
  describe('isDeepObjectMatch()', () => {
    it('should match two equal strings', () => {
      expect(isDeepObjectMatch('heartbeats', 'heartbeats')).toBeTruthy();
      expect(isDeepObjectMatch('heartbeats', 'ticker')).toBeFalsy();
    });

    it('should match simple topic objects', () => {
      const topic1 = {
        topic: 'heartbeats',
      };
      const topic2 = {
        topic: 'heartbeats',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match topic objects with payload, even if keys are differently ordered', () => {
      const topic1 = {
        topic: 'ticker',
        payload: { product_ids: ['BTC-USD', 'ETH-USD'] },
      };
      const topic2 = {
        payload: { product_ids: ['BTC-USD', 'ETH-USD'] },
        topic: 'ticker',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match nested payload objects', () => {
      const topic1 = {
        topic: 'status',
        payload: {
          product_ids: ['BTC-USD', 'ETH-USD'],
        },
      };
      const topic2 = {
        topic: 'status',
        payload: {
          product_ids: ['BTC-USD', 'ETH-USD'],
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should NOT match topics with different payload values', () => {
      const topic1 = {
        topic: 'ticker',
        payload: { product_ids: ['BTC-USD', 'ETH-USD'] },
      };
      const topic2 = {
        topic: 'ticker',
        payload: { product_ids: ['XRP-USD'] },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match topics with nested payload differences', () => {
      const topic1 = {
        topic: 'status',
        payload: {
          product_ids: ['BTC-USD', 'ETH-USD'],
        },
      };
      const topic2 = {
        topic: 'status',
        payload: {
          product_ids: ['BTC-USD'],
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing payload property)', () => {
      const topic1 = {
        topic: 'ticker',
        payload: { product_ids: ['BTC-USD', 'ETH-USD'] },
      };
      const topic2 = {
        topic: 'ticker',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing nested property)', () => {
      const topic1 = {
        topic: 'status',
        payload: {
          product_ids: ['BTC-USD', 'ETH-USD'],
        },
      };
      const topic2 = {
        topic: 'status',
        payload: {},
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match string to object', () => {
      expect(
        isDeepObjectMatch('heartbeats', { topic: 'heartbeats' }),
      ).toBeFalsy();
    });
  });
});
