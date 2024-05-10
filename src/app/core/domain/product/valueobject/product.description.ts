import { Result } from '@util/result';
import { InvalidProductDescriptionError } from '../../exceptions/product/invalid.product.description.error';

export class ProductDescription {
  private static readonly MAX_LENGTH = 255;

  private constructor(public value: string) {}

  static new(value: string): Result<ProductDescription> {
    return this.validate(value).map((value) => new ProductDescription(value));
  }

  private static validate(value: string): Result<string> {
    if (!value || value.length === 0) {
      return Result.failure(
        new InvalidProductDescriptionError('empty product description.')
      );
    }
    if (value.length > ProductDescription.MAX_LENGTH) {
      return Result.failure(
        new InvalidProductDescriptionError(
          `product description cannot be bigger than ${ProductDescription.MAX_LENGTH}.`
        )
      );
    }
    if (value !== value.trim()) {
      return Result.failure(
        new InvalidProductDescriptionError(
          'product description cannot start or end with whitespace.'
        )
      );
    }
    return Result.success(value);
  }
}
