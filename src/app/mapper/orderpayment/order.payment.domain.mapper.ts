import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { OrderPaymentId } from '@app/core/domain/orderpayment/valueobject/order.payment.id';
import { OrderPaymentStatus } from '@app/core/domain/orderpayment/valueobject/order.payment.status';
import { OrderPaymentOutboundResponse } from '@app/port/outbound/orderpayment/dto/order.payment.outbound.response';
import { Result } from '@util/result';

export interface OrderPaymentDomainMapper {
  instance(
    id: OrderPaymentId,
    orderId: OrderId,
    orderPaymentStatus: OrderPaymentStatus,
    createdAt: Date,
    updatedAt: Date
  ): Result<OrderPayment>;

  instanceOutbound(
    orderPaymentOutboundResponse: OrderPaymentOutboundResponse
  ): Result<OrderPayment>;
}
