import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderPriceError extends InvalidValueError {
  private static readonly TYPE = 'OrderPrice';

  constructor(message: string) {
    super(InvalidOrderPriceError.TYPE, message);
  }
}
