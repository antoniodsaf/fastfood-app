import { Result, failure, success } from '@util/result';
import { InvalidOrderItemPriceError } from '../../exceptions/order/invalid.order.item.price.error';

export class OrderItemPrice {
  private constructor(public readonly value: number) {}

  static new(value: number): Result<OrderItemPrice> {
    if (!value) {
      return Result.failure(
        new InvalidOrderItemPriceError('Product Price must be informed.')
      );
    }
    if (typeof value !== 'number' || value <= 0) {
      return failure(
        new InvalidOrderItemPriceError('Order item price must be positive.')
      );
    }
    return success(new OrderItemPrice(value));
  }
}
