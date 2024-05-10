import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderItemIdError extends InvalidValueError {
  private static readonly TYPE = 'OrderItemId';

  constructor(message: string) {
    super(InvalidOrderItemIdError.TYPE, message);
  }
}
