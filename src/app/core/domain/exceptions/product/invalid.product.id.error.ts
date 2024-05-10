import { InvalidValueError } from '../invalid.value.error';

export class InvalidProductIdError extends InvalidValueError {
  static readonly TYPE = 'ProductId';

  constructor(message: string) {
    super(InvalidProductIdError.TYPE, message);
  }
}
