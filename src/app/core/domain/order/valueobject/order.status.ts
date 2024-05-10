import { Result, failure, success } from '@util/result';
import { InvalidOrderStatusError } from '../../exceptions/order/invalid.order.status.error';

export enum OrderStatus {
  RECEIVED = 'RECEIVED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  FINISHED = 'FINISHED'
}

export namespace OrderStatus {
  export function findByValue(value: string): Result<OrderStatus> {
    if (!value) {
      return Result.failure(
        new InvalidOrderStatusError(`Order Status must be informed.`)
      );
    }
    const orderStatus = Object.values(OrderStatus).find(
      (status) => status === value
    );
    if (!orderStatus) {
      return failure(
        new InvalidOrderStatusError(`Invalid Order Status: '${value}'.`)
      );
    }
    return success(orderStatus as OrderStatus);
  }
}
