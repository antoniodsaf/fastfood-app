import { Result, failure, success } from '@util/result';
import { InvalidOrderItemQuantityError } from '../../exceptions/order/invalid.order.item.quantity.error';

export class OrderItemQuantity {
  private constructor(public readonly value: number) {}

  static new(value: number): Result<OrderItemQuantity> {
    if (!value) {
      return Result.failure(
        new InvalidOrderItemQuantityError(
          'Order item quantity must be informed.'
        )
      );
    }
    if (typeof value !== 'number' || value <= 0) {
      return failure(
        new InvalidOrderItemQuantityError(
          'Order item quantity must be a positive integer.'
        )
      );
    }
    return success(new OrderItemQuantity(value));
  }
}
