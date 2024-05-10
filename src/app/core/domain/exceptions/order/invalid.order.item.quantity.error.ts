import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderItemQuantityError extends InvalidValueError {
  private static readonly TYPE = 'OrderItemQuantity';

  constructor(message: string) {
    super(InvalidOrderItemQuantityError.TYPE, message);
  }
}
