import axios from 'axios';

import {
  ExchangeName,
  BinanceTradesListResponse,
  CryptoCurrency,
} from '../types/exchange.type';
import { BaseExchange } from './base-exchange.service';
import { BASE_CURRENCY } from 'src/consts/exchange.const';

export class BinanceExchange extends BaseExchange {
  protected name: ExchangeName = 'binance';
  protected apiUrl = process.env.BINANCE_API;

  protected async getRateToBaseCurrency(inputCurrency: CryptoCurrency) {
    if (inputCurrency === BASE_CURRENCY) return 1;

    const fetchRes = await axios.get<BinanceTradesListResponse>(
      this.apiUrl + `/v3/trades?symbol=${inputCurrency}${BASE_CURRENCY}`,
    );

    if (fetchRes.data?.length !== 0) {
      return Number(fetchRes.data.at(-1).price);
    }

    return null;
  }
}
