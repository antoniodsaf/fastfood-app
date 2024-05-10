import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderIdError extends InvalidValueError {
  private static readonly TYPE = 'OrderId';

  constructor(message: string) {
    super(InvalidOrderIdError.TYPE, message);
  }
}
