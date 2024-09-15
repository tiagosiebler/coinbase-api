import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';

/**
 * REST client for Coinbase Prime API:
 * https://docs.cdp.coinbase.com/commerce-onchain/docs/welcome
 */
export class CBCommerceClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.commerce;
  }

  /**
   *
   * Charges Endpoints
   *
   */

  /**
   * Creates a Charge
   *
   * Creates a charge.
   */
  createCharge(params: {
    buyer_locale?: string;
    cancel_url?: string;
    checkout_id?: string;
    local_price: {
      amount: string;
      currency: string;
    };
    metadata?: {
      custom_field?: string;
      custom_field_two?: string;
    };
    pricing_type: string;
    redirect_url?: string;
  }): Promise<any> {
    return this.postPrivate('/charges', {
      body: params,
    });
  }

  /**
   * Returns All Charges
   *
   * Returns all charges.
   */
  getAllCharges(): Promise<any> {
    return this.getPrivate('/charges');
  }

  /**
   * Returns the Charge with the Order Code
   *
   * Returns the charge with the order code.
   */
  getCharge(params: { charge_code_or_charge_id: string }): Promise<any> {
    return this.getPrivate(`/charges/${params.charge_code_or_charge_id}`);
  }

  /**
   *
   * Checkouts Endpoints
   *
   */

  /**
   * Creates a New Checkout
   *
   * Creates a new checkout.
   */
  createCheckout(params: {
    buyer_locale?: string;
    total_price: {
      amount: string;
      currency: string;
    };
    metadata?: {
      custom_field?: string;
      custom_field_two?: string;
    };
    pricing_type: string;
    requested_info?: string[];
  }): Promise<any> {
    return this.postPrivate('/checkouts', {
      body: params,
    });
  }

  /**
   * Returns All Checkout Sessions
   *
   * Returns all checkout sessions.
   */
  getAllCheckouts(): Promise<any> {
    return this.getPrivate('/checkouts');
  }

  /**
   * Returns a Specific Checkout Session
   *
   * Returns a specific checkout session.
   */
  getCheckout(params: { checkout_id: string }): Promise<any> {
    return this.getPrivate(`/checkouts/${params.checkout_id}`);
  }

  /**
   *
   * Events Endpoints
   *
   */

  /**
   * List Events
   *
   * Lists all events.
   */
  listEvents(headers: { 'X-CC-Version': string }): Promise<any> {
    return this.getPrivate('/events', {
      headers: headers,
    });
  }

  /**
   * Show an Event
   *
   * Retrieves the details of an event. Supply the unique identifier of the event, which you might have received in a webhook.
   */
  showEvent(
    params: { event_id: string },
    headers: { 'X-CC-Version': string },
  ): Promise<any> {
    return this.getPrivate(`/events/${params.event_id}`, { headers: headers });
  }
}
