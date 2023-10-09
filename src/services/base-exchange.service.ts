import { GetRatesDto } from '../dtos/get-rates.dto';
import { ExchangeName, CryptoCurrency } from '../types/exchange.type';
import { roundNumber } from '../utils/round.util';

export abstract class BaseExchange {
  protected abstract apiUrl: string;
  protected abstract name: ExchangeName;

  getName() {
    return this.name;
  }

  async getRate(queryData: GetRatesDto): Promise<number | null> {
    try {
      const rateInputToBase = await this.getRateToBaseCurrency(
        queryData.inputCurrency,
      );

      const rateOutputToBase = await this.getRateToBaseCurrency(
        queryData.outputCurrency,
      );

      if (rateInputToBase && rateOutputToBase) {
        return roundNumber(rateInputToBase / rateOutputToBase);
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  protected async getRateToBaseCurrency(
    _: CryptoCurrency,
  ): Promise<null | number> {
    return null;
  }
}
