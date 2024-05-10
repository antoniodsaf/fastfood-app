import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderStatusError extends InvalidValueError {
  private static readonly TYPE = 'OrderStatus';

  constructor(message: string) {
    super(InvalidOrderStatusError.TYPE, message);
  }
}
