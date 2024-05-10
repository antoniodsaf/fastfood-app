import { Result, failure, success } from '@util/result';
import { InvalidOrderPriceError } from '../../exceptions/order/invalid.order.price.error';

export class OrderPrice {
  private constructor(public readonly value: number) {}

  static new(value: number): Result<OrderPrice> {
    if (!value) {
      return Result.failure(
        new InvalidOrderPriceError('Order Price must be informed.')
      );
    }
    if (typeof value !== 'number' || value <= 0) {
      return failure(
        new InvalidOrderPriceError('Order Price must be positive.')
      );
    }
    return success(new OrderPrice(value));
  }
}
