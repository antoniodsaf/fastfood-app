import { InvalidValueError } from '../invalid.value.error';

export class InvalidProductCategoryError extends InvalidValueError {
  static readonly TYPE = 'ProductCategory';

  constructor(message: string) {
    super(InvalidProductCategoryError.TYPE, message);
  }
}
