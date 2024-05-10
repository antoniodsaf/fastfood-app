import { InvalidValueError } from '../invalid.value.error';

export class InvalidProductPriceError extends InvalidValueError {
  static readonly TYPE = 'ProductPrice';

  constructor(message: string) {
    super(InvalidProductPriceError.TYPE, message);
  }
}
