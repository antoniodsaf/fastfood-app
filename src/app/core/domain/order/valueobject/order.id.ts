import { Result, failure, success } from '@util/result';
import { UUIDUtil } from '@util/uuid.util';
import { InvalidOrderIdError } from '../../exceptions/order/invalid.order.id.error';

export class OrderId {
  private constructor(public readonly value: string) {}

  static new(value: string): Result<OrderId> {
    if (!UUIDUtil.isValid(value)) {
      return failure(new InvalidOrderIdError('invalid order id.'));
    }
    return success(new OrderId(value));
  }

  static generate(): OrderId {
    return new OrderId(UUIDUtil.generate());
  }
}
