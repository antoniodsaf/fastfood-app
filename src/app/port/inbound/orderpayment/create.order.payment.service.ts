import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { Result } from '@util/result';

export interface CreateOrderPaymentService {
  execute(orderId: OrderId): Promise<Result<OrderPayment>>;
}
