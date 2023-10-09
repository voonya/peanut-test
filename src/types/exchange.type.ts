export const supportedCryptoCurrencies = ['ETH', 'BTC', 'USDT'] as const;
export type CryptoCurrency = (typeof supportedCryptoCurrencies)[number];

export type ExchangeName = 'kucoin' | 'binance';

export interface GetEstimateResponse {
  outputAmount: number;
  exchangeName: ExchangeName;
}

export interface Rate {
  rate: number | null;
  exchangeName: ExchangeName;
}

export interface GetRatesResponse {
  rates: Rate[];
}

export interface KucoinMarketHistoryResponse {
  code: string;
  data: {
    sequence: string;
    price: string;
    size: string;
    side: 'buy' | 'sell';
    time: number;
  }[];
}

export type BinanceTradesListResponse = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}[];
