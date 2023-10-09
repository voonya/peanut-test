import { Transform } from 'class-transformer';
import { Validate, IsNumber } from 'class-validator';

import { CryptoCurrency } from 'src/types/exchange.type';
import { IsCryptoCurrencyTypeConstraint } from 'src/utils/crypto-currency-constraint.util';
import { NotMatch } from 'src/utils/not-match.util';

export class GetEstimateDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  inputAmount: number;

  @Validate(IsCryptoCurrencyTypeConstraint)
  inputCurrency: CryptoCurrency;

  @Validate(IsCryptoCurrencyTypeConstraint)
  @NotMatch(GetEstimateDto, 'inputCurrency')
  outputCurrency: CryptoCurrency;
}
