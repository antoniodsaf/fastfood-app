import { InvalidValueError } from '../invalid.value.error';

export class InvalidProductNameError extends InvalidValueError {
  static readonly TYPE = 'ProductName';

  constructor(message: string) {
    super(InvalidProductNameError.TYPE, message);
  }
}
