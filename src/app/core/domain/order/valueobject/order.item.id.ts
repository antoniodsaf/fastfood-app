import { Result, failure, success } from '@util/result';
import { UUIDUtil } from '@util/uuid.util';
import { InvalidOrderItemIdError } from '../../exceptions/order/invalid.order.item.id.error';

export class OrderItemId {
  private constructor(public readonly value: string) {}

  static new(value: string): Result<OrderItemId> {
    if (!UUIDUtil.isValid(value)) {
      return failure(new InvalidOrderItemIdError('invalid order id.'));
    }
    return success(new OrderItemId(value));
  }

  static generate(): OrderItemId {
    return new OrderItemId(UUIDUtil.generate());
  }
}
