import { Result, failure, success } from '@util/result';
import { UUIDUtil } from '@util/uuid.util';
import { InvalidProductIdError } from '../../exceptions/product/invalid.product.id.error';

export class ProductId {
  constructor(readonly value: string) {}
  static new(uuid: string): Result<ProductId> {
    if (!UUIDUtil.isValid(uuid)) {
      return failure(new InvalidProductIdError('invalid product id'));
    }
    return success(new ProductId(uuid));
  }

  static generate(): string {
    return UUIDUtil.generate();
  }
}
