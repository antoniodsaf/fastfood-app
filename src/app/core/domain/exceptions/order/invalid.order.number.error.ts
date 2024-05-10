import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderNumberError extends InvalidValueError {
  private static readonly TYPE = 'OrderNumber';

  constructor(message: string) {
    super(InvalidOrderNumberError.TYPE, message);
  }
}
