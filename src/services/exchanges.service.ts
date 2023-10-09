import { HttpException, HttpStatus } from '@nestjs/common';

import { GetRatesDto } from '../dtos/get-rates.dto';
import { GetEstimateDto } from '../dtos/get-estimate.dto';
import {
  GetEstimateResponse,
  GetRatesResponse,
  Rate,
} from '../types/exchange.type';
import { roundNumber } from '../utils/round.util';
import { BaseExchange } from './base-exchange.service';
import { BinanceExchange } from './binance-exchange.service';
import { KucoinExchange } from './kucoin-exchange.service';

export class ExchangesService {
  exchanges: BaseExchange[];

  constructor() {
    this.exchanges = [new BinanceExchange(), new KucoinExchange()];
  }

  async getEstimate(queryData: GetEstimateDto): Promise<GetEstimateResponse> {
    const ratesData = await this.getRates({
      inputCurrency: queryData.inputCurrency,
      outputCurrency: queryData.outputCurrency,
    });

    if (ratesData.rates.length === 0) {
      throw new HttpException('Rates not found!', HttpStatus.NOT_FOUND);
    }

    const bestRate = ratesData.rates.sort(
      (rate1, rate2) => rate2.rate - rate1.rate,
    )[0];

    return {
      outputAmount: roundNumber(queryData.inputAmount * bestRate.rate),
      exchangeName: bestRate.exchangeName,
    };
  }

  async getRates(queryData: GetRatesDto): Promise<GetRatesResponse> {
    const promises = this.exchanges.map((exchange) =>
      exchange
        .getRate(queryData)
        .then((rate) => ({ rate, exchangeName: exchange.getName() })),
    );

    const ratesData: Rate[] = [];

    await Promise.allSettled(promises).then((results) =>
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value !== null) {
          ratesData.push(result.value);
        }
      }),
    );

    return { rates: ratesData };
  }
}
