import { Result, failure, success } from '@util/result';
import { InvalidOrderNumberError } from '../../exceptions/order/invalid.order.number.error';

export class OrderNumber {
  private constructor(public readonly value: number) {}

  static new(value: number): Result<OrderNumber> {
    if (!value) {
      return Result.failure(
        new InvalidOrderNumberError('Order number must be informed.')
      );
    }
    if (typeof value !== 'number' || value <= 0) {
      return failure(
        new InvalidOrderNumberError('Order number must be a positive number.')
      );
    }
    return success(new OrderNumber(value));
  }
}
