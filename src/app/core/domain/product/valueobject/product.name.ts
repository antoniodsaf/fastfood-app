import { Result } from '@util/result';
import { InvalidProductNameError } from '../../exceptions/product/invalid.product.name.error';

export class ProductName {
  private static readonly MAX_LENGTH = 255;

  private constructor(public value: string) {}

  static new(value: string): Result<ProductName> {
    return this.validate(value).map((value) => new ProductName(value));
  }

  private static validate(value: string): Result<string> {
    if (!value || value.length === 0) {
      return Result.failure(new InvalidProductNameError('empty product name.'));
    }
    if (value.length > ProductName.MAX_LENGTH) {
      return Result.failure(
        new InvalidProductNameError(
          `product name cannot be bigger than ${ProductName.MAX_LENGTH}.`
        )
      );
    }
    if (value !== value.trim()) {
      return Result.failure(
        new InvalidProductNameError(
          'product name cannot start or end with whitespace.'
        )
      );
    }
    return Result.success(value);
  }
}
