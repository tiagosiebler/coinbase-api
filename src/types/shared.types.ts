export interface APISuccessResponse<TData> {
  code: '200000';
  data: TData;
}

export interface APIErrorResponse {
  msg: string;
  code: string;
}

export type APIResponse<TData> = APISuccessResponse<TData> | APIErrorResponse;

// Order configuration types
interface MarketMarketIOC {
  quote_size?: string;
  base_size?: string;
}

interface SORLimitIOC {
  base_size: string;
  limit_price: string;
}

interface LimitLimitGTC {
  base_size: string;
  limit_price: string;
  post_only?: boolean;
}

interface LimitLimitGTD {
  base_size: string;
  limit_price: string;
  end_time: string; // RFC3339 Timestamp
  post_only?: boolean;
}

interface LimitLimitFOK {
  base_size: string;
  limit_price: string;
}

interface StopLimitStopLimitGTC {
  base_size: string;
  limit_price: string;
  stop_price: string;
  stop_direction: 'STOP_DIRECTION_STOP_UP' | 'STOP_DIRECTION_STOP_DOWN';
}

interface StopLimitStopLimitGTD {
  base_size: string;
  limit_price: string;
  stop_price: string;
  end_time: string; // RFC3339 Timestamp
  stop_direction: 'STOP_DIRECTION_STOP_UP' | 'STOP_DIRECTION_STOP_DOWN';
}

interface TriggerBracketGTC {
  base_size: string;
  limit_price: string;
  stop_trigger_price: string;
}

interface TriggerBracketGTD {
  base_size: string;
  limit_price: string;
  stop_trigger_price: string;
  end_time: string; // RFC3339 Timestamp
}

// Main order configuration type
export interface OrderConfiguration {
  market_market_ioc?: MarketMarketIOC;
  sor_limit_ioc?: SORLimitIOC;
  limit_limit_gtc?: LimitLimitGTC;
  limit_limit_gtd?: LimitLimitGTD;
  limit_limit_fok?: LimitLimitFOK;
  stop_limit_stop_limit_gtc?: StopLimitStopLimitGTC;
  stop_limit_stop_limit_gtd?: StopLimitStopLimitGTD;
  trigger_bracket_gtc?: TriggerBracketGTC;
  trigger_bracket_gtd?: TriggerBracketGTD;
}
