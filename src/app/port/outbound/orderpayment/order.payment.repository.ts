import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { OrderPaymentOutboundResponse } from './dto/order.payment.outbound.response';

export interface OrderPaymentRepository {
  save(orderPayment: OrderPayment): Promise<OrderPaymentOutboundResponse>;
  findByOrderId(orderId: OrderId): Promise<OrderPaymentOutboundResponse | null>;
}
