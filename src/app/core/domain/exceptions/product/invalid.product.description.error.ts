import { InvalidValueError } from '../invalid.value.error';

export class InvalidProductDescriptionError extends InvalidValueError {
  static readonly TYPE = 'ProductDescription';

  constructor(message: string) {
    super(InvalidProductDescriptionError.TYPE, message);
  }
}
