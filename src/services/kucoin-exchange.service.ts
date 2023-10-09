import axios from 'axios';

import {
  ExchangeName,
  KucoinMarketHistoryResponse,
  CryptoCurrency,
} from '../types/exchange.type';
import { BaseExchange } from './base-exchange.service';
import { BASE_CURRENCY } from 'src/consts/exchange.const';

export class KucoinExchange extends BaseExchange {
  protected name: ExchangeName = 'kucoin';
  protected apiUrl = process.env.KUCOIN_API;

  protected async getRateToBaseCurrency(inputCurrency: CryptoCurrency) {
    if (inputCurrency === BASE_CURRENCY) return 1;

    const fetchRes = await axios.get<KucoinMarketHistoryResponse>(
      this.apiUrl + `/v1/market/histories?symbol=${inputCurrency}-USDT`,
    );

    if (fetchRes.data?.data?.length !== 0) {
      return Number(fetchRes.data.data.at(-1).price);
    }

    return null;
  }
}
