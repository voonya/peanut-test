import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ClassConstructor } from 'class-transformer';

@ValidatorConstraint({ name: 'NotMatch' })
export class NotMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [propertyName] = args.constraints;
    return args.object[propertyName] !== value;
  }

  defaultMessage(args: ValidationArguments) {
    const [propertyName] = args.constraints;
    return `${propertyName} and ${args.property} should not match`;
  }
}

export const NotMatch = <T>(
  _: ClassConstructor<T>,
  property: keyof T,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: NotMatchConstraint,
    });
  };
};
