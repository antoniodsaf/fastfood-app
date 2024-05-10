import { Result } from '@util/result';
import { InvalidProductPriceError } from '../../exceptions/product/invalid.product.price.error';

export class ProductPrice {
  private constructor(public value: number) {}

  static new(value: number): Result<ProductPrice> {
    if (!value) {
      return Result.failure(
        new InvalidProductPriceError('Product Price must be informed.')
      );
    }
    if (typeof value !== 'number' || value <= 0) {
      return Result.failure(
        new InvalidProductPriceError('Product Price must be a positive number.')
      );
    }
    return Result.success(new ProductPrice(value));
  }
}
