import { Validate } from 'class-validator';

import { CryptoCurrency } from 'src/types/exchange.type';
import { IsCryptoCurrencyTypeConstraint } from 'src/utils/crypto-currency-constraint.util';
import { NotMatch } from 'src/utils/not-match.util';

export class GetRatesDto {
  @Validate(IsCryptoCurrencyTypeConstraint)
  inputCurrency: CryptoCurrency;

  @Validate(IsCryptoCurrencyTypeConstraint)
  @NotMatch(GetRatesDto, 'inputCurrency')
  outputCurrency: CryptoCurrency;
}
