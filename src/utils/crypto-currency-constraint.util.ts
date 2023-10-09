import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { supportedCryptoCurrencies } from 'src/types/exchange.type';

@ValidatorConstraint({ name: 'isCryptoCurrencyTypeConstraint' })
export class IsCryptoCurrencyTypeConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    return supportedCryptoCurrencies.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be one of supported currencies`;
  }
}
