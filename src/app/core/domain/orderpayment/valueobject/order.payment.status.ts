import { Result } from '@util/result';
import { InvalidOrderPaymentStatusError } from '../../exceptions/orderpayment/invalid.order.payment.status.error';

export enum OrderPaymentStatus {
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  WAITING = 'WAITING'
}

export namespace OrderPaymentStatus {
  export function findByValue(value: string): Result<OrderPaymentStatus> {
    const status = Object.values(OrderPaymentStatus).find(
      (status) => status === value
    );
    if (!status) {
      return Result.failure(
        new InvalidOrderPaymentStatusError(
          `Invalid Order Payment Status: '${value}'.`
        )
      );
    }
    return Result.success(status as OrderPaymentStatus);
  }
}
