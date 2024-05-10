import { Result } from '@util/result';
import { UUIDUtil } from '@util/uuid.util';
import { InvalidOrderPaymentIdError } from '../../exceptions/orderpayment/invalid.order.payment.id.error';

export class OrderPaymentId {
  private constructor(public value: string) {}

  static new(value: string): Result<OrderPaymentId> {
    if (!UUIDUtil.isValid(value)) {
      return Result.failure(
        new InvalidOrderPaymentIdError('invalid order payment id.')
      );
    }
    return Result.success(new OrderPaymentId(value));
  }

  static generate(): OrderPaymentId {
    return new OrderPaymentId(UUIDUtil.generate());
  }
}
