import { Result } from '@util/result';
import { OrderId } from '../order/valueobject/order.id';
import { OrderPaymentId } from './valueobject/order.payment.id';
import { OrderPaymentStatus } from './valueobject/order.payment.status';

export class OrderPayment {
  constructor(
    public readonly id: OrderPaymentId,
    public readonly orderId: OrderId,
    public readonly orderPaymentStatus: OrderPaymentStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static new(
    id: OrderPaymentId,
    orderId: OrderId,
    orderPaymentStatus: OrderPaymentStatus,
    createdAt: Date,
    updatedAt: Date
  ): Result<OrderPayment> {
    return Result.success(
      new OrderPayment(id, orderId, orderPaymentStatus, createdAt, updatedAt)
    );
  }

  payment(paid: boolean): OrderPayment {
    const updatedAt = new Date();

    const status = paid
      ? OrderPaymentStatus.ACCEPTED
      : OrderPaymentStatus.REFUSED;

    return new OrderPayment(
      this.id,
      this.orderId,
      status,
      this.createdAt,
      updatedAt
    );
  }
}
