import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderItemPriceError extends InvalidValueError {
  private static readonly TYPE = 'OrderItemPrice';

  constructor(message: string) {
    super(InvalidOrderItemPriceError.TYPE, message);
  }
}
