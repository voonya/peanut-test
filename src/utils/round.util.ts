import { COUNT_DIGITS_AFTER_DOT } from 'src/consts/exchange.const';

export const roundNumber = (number: number, digits = COUNT_DIGITS_AFTER_DOT) =>
  Math.floor(number * Math.pow(10, digits)) / Math.pow(10, digits);
