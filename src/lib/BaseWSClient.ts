import EventEmitter from 'events';
import WebSocket from 'isomorphic-ws';

import {
  WebsocketClientOptions,
  WSClientConfigurableOptions,
} from '../types/websockets/client.js';
import { WsOperation } from '../types/websockets/requests.js';
import { WS_LOGGER_CATEGORY } from '../WebsocketClient.js';
import { DefaultLogger } from './websocket/logger.js';
import {
  isMessageEvent,
  MessageEventLike,
  WsTopicRequest,
  WsTopicRequestOrStringTopic,
} from './websocket/websocket-util.js';
import { WsStore } from './websocket/WsStore.js';
import {
  WSConnectedResult,
  WsConnectionStateEnum,
} from './websocket/WsStore.types.js';

interface WSClientEventMap<WsKey extends string> {
  /** Connection opened. If this connection was previously opened and reconnected, expect the reconnected event instead */
  open: (evt: { wsKey: WsKey; event: any }) => void;
  /** Reconnecting a dropped connection */
  reconnect: (evt: { wsKey: WsKey; event: any }) => void;
  /** Successfully reconnected a connection that dropped */
  reconnected: (evt: { wsKey: WsKey; event: any }) => void;
  /** Connection closed */
  close: (evt: { wsKey: WsKey; event: any }) => void;
  /** Received reply to websocket command (e.g. after subscribing to topics) */
  response: (response: any & { wsKey: WsKey }) => void;
  /** Received data for topic */
  update: (response: any & { wsKey: WsKey }) => void;
  /** Exception from ws client OR custom listeners (e.g. if you throw inside your event handler) */
  exception: (response: any & { wsKey: WsKey }) => void;
  error: (response: any & { wsKey: WsKey }) => void;
  /** Confirmation that a connection successfully authenticated */
  authenticated: (event: { wsKey: WsKey; event: any }) => void;
}

export interface EmittableEvent<TEvent = any> {
  eventType:
    | 'response'
    | 'update'
    | 'exception'
    | 'authenticated'
    | 'connectionReady'; // tied to "requireConnectionReadyConfirmation"
  event: TEvent;
}

// Type safety for on and emit handlers: https://stackoverflow.com/a/61609010/880837
export interface BaseWebsocketClient<TWSKey extends string> {
  on<U extends keyof WSClientEventMap<TWSKey>>(
    event: U,
    listener: WSClientEventMap<TWSKey>[U],
  ): this;

  emit<U extends keyof WSClientEventMap<TWSKey>>(
    event: U,
    ...args: Parameters<WSClientEventMap<TWSKey>[U]>
  ): boolean;
}

/**
 * Users can conveniently pass topics as strings or objects (object has topic name + optional params).
 *
 * This method normalises topics into objects (object has topic name + optional params).
 */
function getNormalisedTopicRequests(
  wsTopicRequests: WsTopicRequestOrStringTopic<string>[],
): WsTopicRequest<string>[] {
  const normalisedTopicRequests: WsTopicRequest<string>[] = [];

  for (const wsTopicRequest of wsTopicRequests) {
    // passed as string, convert to object
    if (typeof wsTopicRequest === 'string') {
      const topicRequest: WsTopicRequest<string> = {
        topic: wsTopicRequest,
        payload: undefined,
      };
      normalisedTopicRequests.push(topicRequest);
      continue;
    }

    // already a normalised object, thanks to user
    normalisedTopicRequests.push(wsTopicRequest);
  }
  return normalisedTopicRequests;
}

type WSTopic = string;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class BaseWebsocketClient<
  TWSKey extends string,
> extends EventEmitter {
  private wsStore: WsStore<TWSKey, WsTopicRequest<WSTopic>>;

  protected logger: typeof DefaultLogger;
  protected options: WebsocketClientOptions;

  private wsApiRequestId: number = 0;

  constructor(
    options?: WSClientConfigurableOptions,
    logger?: typeof DefaultLogger,
  ) {
    super();

    this.logger = logger || DefaultLogger;
    this.wsStore = new WsStore(this.logger);

    this.options = {
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      recvWindow: 0,
      // Requires a confirmation "response" from the ws connection before assuming it is ready
      requireConnectionReadyConfirmation: true,
      // Automatically auth after opening a connection?
      authPrivateConnectionsOnConnect: false,
      // Automatically include auth/sign with every WS request
      authPrivateRequests: false,
      // Automatically re-auth WS API, if we were auth'd before and get reconnected
      reauthWSAPIOnReconnect: true,
      ...options,
    };
  }

  protected abstract sendPingEvent(wsKey: TWSKey, ws: WebSocket): void;
  protected abstract sendPongEvent(wsKey: TWSKey, ws: WebSocket): void;

  protected abstract isWsPong(data: any): boolean;
  protected abstract isWsPing(data: any): boolean;

  protected abstract getWsAuthRequestEvent(wsKey: TWSKey): Promise<object>;

  protected abstract isPrivateTopicRequest(
    request: WsTopicRequest<WSTopic>,
    wsKey: TWSKey,
  ): boolean;

  /**
   * Returns a list of string events that can be individually sent upstream to complete subscribing/unsubscribing/etc to these topics
   */
  protected abstract getWsOperationEventsForTopics(
    topics: WsTopicRequest<WSTopic>[],
    wsKey: TWSKey,
    operation: WsOperation,
  ): Promise<string[]>;

  protected abstract getPrivateWSKeys(): TWSKey[];
  protected abstract getWsUrl(wsKey: TWSKey): Promise<string>;

  protected abstract getMaxTopicsPerSubscribeEvent(
    wsKey: TWSKey,
  ): number | null;

  /**
   * Abstraction called to sort ws events into emittable event types (response to a request, data update, etc)
   */
  protected abstract resolveEmittableEvents(
    wsKey: TWSKey,
    event: MessageEventLike,
  ): EmittableEvent[];

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  protected abstract connectAll(): Promise<(WSConnectedResult | undefined)[]>;

  protected isPrivateWsKey(wsKey: TWSKey): boolean {
    return this.getPrivateWSKeys().includes(wsKey);
  }

  /** Returns auto-incrementing request ID, used to track promise references for async requests */
  protected getNewRequestId(): string {
    return `${++this.wsApiRequestId}`;
  }

  protected abstract sendWSAPIRequest(
    wsKey: TWSKey,
    channel: WSTopic,
    params?: any,
  ): Promise<unknown>;

  protected abstract sendWSAPIRequest(
    wsKey: TWSKey,
    channel: WSTopic,
    params: any,
  ): Promise<unknown>;

  /**
   * Subscribe to one or more topics on a WS connection (identified by WS Key).
   *
   * - Topics are automatically cached
   * - Connections are automatically opened, if not yet connected
   * - Authentication is automatically handled
   * - Topics are automatically resubscribed to, if something happens to the connection, unless you call unsubsribeTopicsForWsKey(topics, key).
   *
   * @param wsTopicRequests array of topics to subscribe to
   * @param wsKey ws key referring to the ws connection these topics should be subscribed on
   */
  public subscribeTopicsForWsKey(
    wsTopicRequests: WsTopicRequestOrStringTopic<WSTopic>[],
    wsKey: TWSKey,
  ) {
    const normalisedTopicRequests = getNormalisedTopicRequests(wsTopicRequests);

    // Store topics, so future automation (post-auth, post-reconnect) has everything needed to resubscribe automatically
    for (const topic of normalisedTopicRequests) {
      this.wsStore.addTopic(wsKey, topic);
    }

    const isConnected = this.wsStore.isConnectionState(
      wsKey,
      WsConnectionStateEnum.CONNECTED,
    );

    const isConnectionInProgress =
      this.wsStore.isConnectionAttemptInProgress(wsKey);

    // start connection process if it hasn't yet begun. Topics are automatically subscribed to on-connect
    if (!isConnected && !isConnectionInProgress) {
      return this.connect(wsKey);
    }

    // Subscribe should happen automatically once connected, nothing to do here after topics are added to wsStore.
    if (!isConnected) {
      /**
       * Are we in the process of connection? Nothing to send yet.
       */
      this.logger.trace(
        `WS not connected - requests queued for retry once connected.`,
        {
          ...WS_LOGGER_CATEGORY,
          wsKey,
          wsTopicRequests,
        },
      );
      return;
    }

    // We're connected. Check if auth is needed and if already authenticated
    const isPrivateConnection = this.isPrivateWsKey(wsKey);
    const isAuthenticated = this.wsStore.get(wsKey)?.isAuthenticated;
    if (isPrivateConnection && !isAuthenticated) {
      /**
       * If not authenticated yet and auth is required, don't request topics yet.
       *
       * Auth should already automatically be in progress, so no action needed from here. Topics will automatically subscribe post-auth success.
       */
      this.logger.trace(
        `WS connected but not authenticated yet - awaiting auth before subscribing`,
      );
      return false;
    }

    // Finally, request subscription to topics if the connection is healthy and ready
    this.requestSubscribeTopics(wsKey, normalisedTopicRequests);
  }

  protected unsubscribeTopicsForWsKey(
    wsTopicRequests: WsTopicRequestOrStringTopic<string>[],
    wsKey: TWSKey,
  ) {
    const normalisedTopicRequests = getNormalisedTopicRequests(wsTopicRequests);

    // Store topics, so future automation (post-auth, post-reconnect) has everything needed to resubscribe automatically
    for (const topic of normalisedTopicRequests) {
      this.wsStore.addTopic(wsKey, topic);
    }

    const isConnected = this.wsStore.isConnectionState(
      wsKey,
      WsConnectionStateEnum.CONNECTED,
    );

    // If not connected, don't need to do anything.
    // Removing the topic from the store is enough to stop it from being resubscribed to on reconnect.
    if (!isConnected) {
      return;
    }

    // We're connected. Check if auth is needed and if already authenticated
    const isPrivateConnection = this.isPrivateWsKey(wsKey);
    const isAuthenticated = this.wsStore.get(wsKey)?.isAuthenticated;
    if (isPrivateConnection && !isAuthenticated) {
      /**
       * If not authenticated yet and auth is required, don't need to do anything.
       * We don't subscribe to topics until auth is complete anyway.
       */
      return;
    }

    // Finally, request subscription to topics if the connection is healthy and ready
    this.requestUnsubscribeTopics(wsKey, normalisedTopicRequests);
  }

  /**
   * Splits topic requests into two groups, public & private topic requests
   */
  private sortTopicRequestsIntoPublicPrivate(
    wsTopicRequests: WsTopicRequest<string>[],
    wsKey: TWSKey,
  ): {
    publicReqs: WsTopicRequest<string>[];
    privateReqs: WsTopicRequest<string>[];
  } {
    const publicTopicRequests: WsTopicRequest<string>[] = [];
    const privateTopicRequests: WsTopicRequest<string>[] = [];

    for (const topic of wsTopicRequests) {
      if (this.isPrivateTopicRequest(topic, wsKey)) {
        privateTopicRequests.push(topic);
      } else {
        publicTopicRequests.push(topic);
      }
    }

    return {
      publicReqs: publicTopicRequests,
      privateReqs: privateTopicRequests,
    };
  }

  /** Get the WsStore that tracks websockets & topics */
  public getWsStore(): WsStore<TWSKey, WsTopicRequest<string>> {
    return this.wsStore;
  }

  public close(wsKey: TWSKey, force?: boolean) {
    this.logger.info('Closing connection', { ...WS_LOGGER_CATEGORY, wsKey });
    this.setWsState(wsKey, WsConnectionStateEnum.CLOSING);
    this.clearTimers(wsKey);

    const ws = this.getWs(wsKey);
    ws?.close();
    if (force) {
      ws?.terminate();
    }
  }

  public closeAll(force?: boolean) {
    this.wsStore.getKeys().forEach((key: TWSKey) => {
      this.close(key, force);
    });
  }

  public isConnected(wsKey: TWSKey): boolean {
    return this.wsStore.isConnectionState(
      wsKey,
      WsConnectionStateEnum.CONNECTED,
    );
  }

  /**
   * Request connection to a specific websocket, instead of waiting for automatic connection.
   */
  public async connect(wsKey: TWSKey): Promise<WSConnectedResult | undefined> {
    try {
      if (this.wsStore.isWsOpen(wsKey)) {
        this.logger.error(
          'Refused to connect to ws with existing active connection',
          { ...WS_LOGGER_CATEGORY, wsKey },
        );
        return { wsKey };
      }

      if (this.wsStore.isConnectionAttemptInProgress(wsKey)) {
        this.logger.error(
          'Refused to connect to ws, connection attempt already active',
          { ...WS_LOGGER_CATEGORY, wsKey },
        );
        return;
      }

      if (
        !this.wsStore.getConnectionState(wsKey) ||
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.INITIAL)
      ) {
        this.setWsState(wsKey, WsConnectionStateEnum.CONNECTING);
      }

      if (!this.wsStore.getConnectionInProgressPromise(wsKey)) {
        this.wsStore.createConnectionInProgressPromise(wsKey, false);
      }

      try {
        const url = await this.getWsUrl(wsKey);
        const ws = this.connectToWsUrl(url, wsKey);

        this.wsStore.setWs(wsKey, ws);
      } catch (e) {
        this.logger.error(`Exception fetching WS URL`, e);
        throw e;
      }

      return this.wsStore.getConnectionInProgressPromise(wsKey)?.promise;
    } catch (err) {
      this.parseWsError('Connection failed', err, wsKey);
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
    }
  }

  private connectToWsUrl(url: string, wsKey: TWSKey): WebSocket {
    this.logger.trace(`Opening WS connection to URL: ${url}`, {
      ...WS_LOGGER_CATEGORY,
      wsKey,
    });

    const ws = new WebSocket(url, undefined);

    ws.onopen = (event: any) => this.onWsOpen(event, wsKey);
    ws.onmessage = (event: any) => this.onWsMessage(event, wsKey, ws);
    ws.onerror = (event: any) =>
      this.parseWsError('websocket error', event, wsKey);
    ws.onclose = (event: any) => this.onWsClose(event, wsKey);

    return ws;
  }

  private parseWsError(context: string, error: any, wsKey: TWSKey) {
    if (this.wsStore.isConnectionAttemptInProgress(wsKey)) {
      this.setWsState(wsKey, WsConnectionStateEnum.ERROR_RECONNECTING);
    }
    if (!error.message) {
      this.logger.error(`${context} due to unexpected error: `, error);
      this.emit('response', { ...error, wsKey });
      this.emit('exception', { ...error, wsKey });

      return;
    }

    switch (error.message) {
      case 'Unexpected server response: 401':
        this.logger.error(`${context} due to 401 authorization failure.`, {
          ...WS_LOGGER_CATEGORY,
          wsKey,
        });
        break;

      default:
        if (error?.code === 'ENOTFOUND') {
          this.logger.error(
            `${context} due to lookup exception: "${
              error?.msg || error?.message || error
            }"`,
            {
              ...WS_LOGGER_CATEGORY,
              wsKey,
              error,
              connectionState: this.wsStore.getConnectionState(wsKey),
            },
          );
          break;
        }

        this.logger.error(
          `${context} due to unexpected response error: "${
            error?.msg || error?.message || error
          }"`,
          { ...WS_LOGGER_CATEGORY, wsKey, error },
        );
        break;
    }

    this.emit('exception', { ...error, wsKey });
  }

  /** Get a signature, build the auth request and send it */
  private async sendAuthRequest(wsKey: TWSKey): Promise<void> {
    try {
      this.logger.info(`Sending auth request...`, {
        ...WS_LOGGER_CATEGORY,
        wsKey,
      });

      const request = await this.getWsAuthRequestEvent(wsKey);

      return this.tryWsSend(wsKey, JSON.stringify(request));
    } catch (e) {
      this.logger.trace(e, { ...WS_LOGGER_CATEGORY, wsKey });
    }
  }

  private reconnectWithDelay(wsKey: TWSKey, connectionDelayMs: number) {
    this.clearTimers(wsKey);

    this.wsStore.get(wsKey, true).activeReconnectTimer = setTimeout(() => {
      this.logger.info('Reconnecting to websocket', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
      });
      this.connect(wsKey);
    }, connectionDelayMs);
  }

  private ping(wsKey: TWSKey) {
    if (this.wsStore.get(wsKey, true).activePongTimer) {
      return;
    }

    this.clearPongTimer(wsKey);

    this.logger.trace('Sending ping', { ...WS_LOGGER_CATEGORY, wsKey });
    const ws = this.wsStore.get(wsKey, true).ws;

    if (!ws) {
      this.logger.error(
        `Unable to send ping for wsKey "${wsKey}" - no connection found`,
      );
      return;
    }
    this.sendPingEvent(wsKey, ws);

    this.wsStore.get(wsKey, true).activePongTimer = setTimeout(() => {
      this.logger.info('Pong timeout - closing socket to reconnect', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
      });

      this.clearPongTimer(wsKey);

      this.getWs(wsKey)?.terminate();
    }, this.options.pongTimeout);
  }

  private clearTimers(wsKey: TWSKey) {
    this.clearPingTimer(wsKey);
    this.clearPongTimer(wsKey);
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activeReconnectTimer) {
      clearTimeout(wsState.activeReconnectTimer);
    }
  }

  // Send a ping at intervals
  private clearPingTimer(wsKey: TWSKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePingTimer) {
      clearInterval(wsState.activePingTimer);
      wsState.activePingTimer = undefined;
    }
  }

  // Expect a pong within a time limit
  private clearPongTimer(wsKey: TWSKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePongTimer) {
      clearTimeout(wsState.activePongTimer);
      wsState.activePongTimer = undefined;
      // this.logger.trace(`Cleared pong timeout for "${wsKey}"`);
    } else {
      // this.logger.trace(`No active pong timer for "${wsKey}"`);
    }
  }

  /**
   * Simply builds and sends subscribe events for a list of topics for a ws key
   *
   * @private Use the `subscribe(topics)` or `subscribeTopicsForWsKey(topics, wsKey)` method to subscribe to topics. Send WS message to subscribe to topics.
   */
  private async requestSubscribeTopics(
    wsKey: TWSKey,
    topics: WsTopicRequest<string>[],
  ) {
    if (!topics.length) {
      return;
    }

    // Automatically splits requests into smaller batches, if needed
    const subscribeWsMessages = await this.getWsOperationEventsForTopics(
      topics,
      wsKey,
      'subscribe',
    );

    this.logger.trace(
      `Subscribing to ${topics.length} "${wsKey}" topics in ${subscribeWsMessages.length} batches.`, // Events: "${JSON.stringify(topics)}"
    );

    for (const wsMessage of subscribeWsMessages) {
      // this.logger.trace(`Sending batch via message: "${wsMessage}"`);
      this.tryWsSend(wsKey, wsMessage);
    }

    this.logger.trace(
      `Finished subscribing to ${topics.length} "${wsKey}" topics in ${subscribeWsMessages.length} batches.`,
    );
  }

  /**
   * Simply builds and sends unsubscribe events for a list of topics for a ws key
   *
   * @private Use the `unsubscribe(topics)` method to unsubscribe from topics. Send WS message to unsubscribe from topics.
   */
  private async requestUnsubscribeTopics(
    wsKey: TWSKey,
    wsTopicRequests: WsTopicRequest<string>[],
  ) {
    if (!wsTopicRequests.length) {
      return;
    }

    const subscribeWsMessages = await this.getWsOperationEventsForTopics(
      wsTopicRequests,
      wsKey,
      'unsubscribe',
    );

    this.logger.trace(
      `Unsubscribing to ${wsTopicRequests.length} "${wsKey}" topics in ${subscribeWsMessages.length} batches. Events: "${JSON.stringify(wsTopicRequests)}"`,
    );

    for (const wsMessage of subscribeWsMessages) {
      this.logger.trace(`Sending batch via message: "${wsMessage}"`);
      this.tryWsSend(wsKey, wsMessage);
    }

    this.logger.trace(
      `Finished unsubscribing to ${wsTopicRequests.length} "${wsKey}" topics in ${subscribeWsMessages.length} batches.`,
    );
  }

  /**
   * Try sending a string event on a WS connection (identified by the WS Key)
   */
  public tryWsSend(wsKey: TWSKey, wsMessage: string) {
    try {
      this.logger.trace(`Sending upstream ws message: `, {
        ...WS_LOGGER_CATEGORY,
        wsMessage,
        wsKey,
      });
      if (!wsKey) {
        throw new Error(
          'Cannot send message due to no known websocket for this wsKey',
        );
      }
      const ws = this.getWs(wsKey);
      if (!ws) {
        throw new Error(
          `${wsKey} socket not connected yet, call "connectAll()" first then try again when the "open" event arrives`,
        );
      }
      ws.send(wsMessage);
    } catch (e) {
      this.logger.error(`Failed to send WS message`, {
        ...WS_LOGGER_CATEGORY,
        wsMessage,
        wsKey,
        exception: e,
      });
    }
  }

  private async onWsOpen(event: any, wsKey: TWSKey) {
    const didReconnectSuccessfully =
      this.wsStore.isConnectionState(
        wsKey,
        WsConnectionStateEnum.RECONNECTING,
      ) ||
      this.wsStore.isConnectionState(
        wsKey,
        WsConnectionStateEnum.ERROR_RECONNECTING,
      );

    if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTING)
    ) {
      this.logger.info('Websocket connected', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
      });
      this.emit('open', { wsKey, event });
    } else {
      this.logger.info('Websocket reconnected', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
        didReconnectSuccessfully,
      });
      this.emit('reconnected', {
        wsKey,
        event,
        didReconnectSuccessfully,
      } as any);
    }

    this.setWsState(wsKey, WsConnectionStateEnum.CONNECTED);

    this.logger.trace(`Enabled ping timer`, { ...WS_LOGGER_CATEGORY, wsKey });
    this.wsStore.get(wsKey, true)!.activePingTimer = setInterval(
      () => this.ping(wsKey),
      this.options.pingInterval,
    );

    if (!this.options.requireConnectionReadyConfirmation) {
      await this.onWsReadyForEvents(wsKey);
    }
  }

  /**
   * Called automatically once a connection is ready.
   * - Some exchanges are ready immediately after the connections open.
   * - Some exchanges send an event to confirm the connection is ready for us.
   *
   * This method is called to act when the connection is ready. Use `requireConnectionReadyConfirmation` to control how this is called.
   */
  private async onWsReadyForEvents(wsKey: TWSKey) {
    try {
      // Resolve & cleanup deferred "connection attempt in progress" promise
      const connectionInProgressPromise =
        this.wsStore.getConnectionInProgressPromise(wsKey);

      if (connectionInProgressPromise?.resolve) {
        connectionInProgressPromise.resolve({
          wsKey,
        });
      }
    } catch (e) {
      this.logger.error(
        `Exception trying to resolve "connectionInProgress" promise`,
      );
    }

    // Remove before resolving, in case there's more requests queued
    this.wsStore.removeConnectingInProgressPromise(wsKey);

    // Some websockets require an auth packet to be sent after opening the connection
    if (
      this.isPrivateWsKey(wsKey) &&
      this.options.authPrivateConnectionsOnConnect
    ) {
      await this.sendAuthRequest(wsKey);
    }

    // Reconnect to topics known before it connected
    const { privateReqs, publicReqs } = this.sortTopicRequestsIntoPublicPrivate(
      [...this.wsStore.getTopics(wsKey)],
      wsKey,
    );

    // Request sub to public topics, if any
    this.requestSubscribeTopics(wsKey, publicReqs);

    // Request sub to private topics, if auth on connect isn't needed
    if (!this.options.authPrivateConnectionsOnConnect) {
      this.requestSubscribeTopics(wsKey, privateReqs);
    }
  }

  /**
   * Handle subscription to private topics _after_ authentication successfully completes asynchronously.
   *
   * Only used for exchanges that require auth before sending private topic subscription requests
   */
  private onWsAuthenticated(
    wsKey: TWSKey,
    event: { isWSAPI?: boolean; WSAPIAuthChannel?: string },
  ) {
    const wsState = this.wsStore.get(wsKey, true);
    wsState.isAuthenticated = true;

    if (this.options.authPrivateConnectionsOnConnect) {
      const topics = [...this.wsStore.getTopics(wsKey)];
      const privateTopics = topics.filter((topic) =>
        this.isPrivateTopicRequest(topic, wsKey),
      );

      if (privateTopics.length) {
        this.subscribeTopicsForWsKey(privateTopics, wsKey);
      }
    }

    if (event?.isWSAPI && event?.WSAPIAuthChannel) {
      wsState.didAuthWSAPI = true;
      wsState.WSAPIAuthChannel = event.WSAPIAuthChannel;
    }
  }

  private onWsMessage(event: unknown, wsKey: TWSKey, ws: WebSocket) {
    try {
      // any message can clear the pong timer - wouldn't get a message if the ws wasn't working
      this.clearPongTimer(wsKey);

      if (this.isWsPong(event)) {
        this.logger.trace('Received pong', {
          ...WS_LOGGER_CATEGORY,
          wsKey,
          event: (event as any)?.data,
        });
        return;
      }

      if (this.isWsPing(event)) {
        this.logger.trace('Received ping', {
          ...WS_LOGGER_CATEGORY,
          wsKey,
          event,
        });
        this.sendPongEvent(wsKey, ws);
        return;
      }

      if (isMessageEvent(event)) {
        const data = event.data;
        const dataType = event.type;

        const emittableEvents = this.resolveEmittableEvents(wsKey, event);

        if (!emittableEvents.length) {
          // console.log(`raw event: `, { data, dataType, emittableEvents });
          this.logger.error(
            'Unhandled/unrecognised ws event message - returned no emittable data',
            {
              ...WS_LOGGER_CATEGORY,
              message: data || 'no message',
              dataType,
              event,
              wsKey,
            },
          );

          return this.emit('update', { ...event, wsKey });
        }

        for (const emittable of emittableEvents) {
          if (this.isWsPong(emittable)) {
            this.logger.trace('Received pong', {
              ...WS_LOGGER_CATEGORY,
              wsKey,
              data,
            });
            continue;
          }

          if (emittable.eventType === 'connectionReady') {
            this.logger.trace(
              `Successfully connected - connection ready for events`,
              {
                ...WS_LOGGER_CATEGORY,
                wsKey,
              },
            );

            const wsState = this.wsStore.get(wsKey);
            if (
              this.isPrivateWsKey(wsKey) &&
              wsState &&
              !this.options.authPrivateConnectionsOnConnect
            ) {
              wsState.isAuthenticated = true;
            }

            this.emit('response', { ...emittable.event, wsKey });
            this.onWsReadyForEvents(wsKey);
            continue;
          }

          if (emittable.eventType === 'authenticated') {
            this.logger.trace(`Successfully authenticated`, {
              ...WS_LOGGER_CATEGORY,
              wsKey,
            });
            this.emit(emittable.eventType, { ...emittable.event, wsKey });
            this.onWsAuthenticated(wsKey, emittable.event);
            continue;
          }

          this.emit(emittable.eventType, { ...emittable.event, wsKey });
        }

        return;
      }

      this.logger.error(
        'Unhandled/unrecognised ws event message - unexpected message format',
        {
          ...WS_LOGGER_CATEGORY,
          message: event || 'no message',
          event,
          wsKey,
        },
      );
    } catch (e) {
      this.logger.error('Failed to parse ws event message', {
        ...WS_LOGGER_CATEGORY,
        error: e,
        event,
        wsKey,
      });
    }
  }

  private onWsClose(event: unknown, wsKey: TWSKey) {
    this.logger.info('Websocket connection closed', {
      ...WS_LOGGER_CATEGORY,
      wsKey,
    });

    if (
      this.wsStore.getConnectionState(wsKey) !== WsConnectionStateEnum.CLOSING
    ) {
      // clean up any pending promises for this connection
      this.getWsStore().rejectAllDeferredPromises(
        wsKey,
        'connection lost, reconnecting',
      );

      this.setWsState(wsKey, WsConnectionStateEnum.INITIAL);

      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
      this.emit('reconnect', { wsKey, event });
    } else {
      // clean up any pending promises for this connection
      this.getWsStore().rejectAllDeferredPromises(wsKey, 'disconnected');
      this.setWsState(wsKey, WsConnectionStateEnum.INITIAL);
      this.emit('close', { wsKey, event });
    }
  }

  private getWs(wsKey: TWSKey) {
    return this.wsStore.getWs(wsKey);
  }

  private setWsState(wsKey: TWSKey, state: WsConnectionStateEnum) {
    this.wsStore.setConnectionState(wsKey, state);
  }

  /**
   * Promise-driven method to assert that a ws has successfully connected (will await until connection is open)
   */
  protected async assertIsConnected(wsKey: TWSKey): Promise<unknown> {
    const isConnected = this.getWsStore().isConnectionState(
      wsKey,
      WsConnectionStateEnum.CONNECTED,
    );

    if (!isConnected) {
      const inProgressPromise =
        this.getWsStore().getConnectionInProgressPromise(wsKey);

      // Already in progress? Await shared promise and retry
      if (inProgressPromise) {
        this.logger.trace(
          `sendWSAPIRequest(): Awaiting EXISTING connection promise...`,
        );
        await inProgressPromise.promise;
        this.logger.trace(
          `sendWSAPIRequest(): EXISTING connection promise resolved!`,
        );
        return;
      }

      // Start connection, it should automatically store/return a promise.
      this.logger.trace(
        `sendWSAPIRequest(): Not connected yet...queue await connection...`,
      );

      await this.connect(wsKey);

      this.logger.trace(
        `sendWSAPIRequest(): New connection promise resolved! `,
      );
    }
  }
}
