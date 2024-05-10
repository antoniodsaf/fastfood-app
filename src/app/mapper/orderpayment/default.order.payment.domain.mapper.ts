import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderPaymentId } from '@app/core/domain/orderpayment/valueobject/order.payment.id';
import { OrderPaymentStatus } from '@app/core/domain/orderpayment/valueobject/order.payment.status';
import { OrderPaymentOutboundResponse } from '@app/port/outbound/orderpayment/dto/order.payment.outbound.response';
import { OrderPaymentDomainMapper } from './order.payment.domain.mapper';
import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { Result } from '@util/result';

export class DefaultOrderPaymentDomainMapper
  implements OrderPaymentDomainMapper
{
  instance(
    id: OrderPaymentId,
    orderId: OrderId,
    orderPaymentStatus: OrderPaymentStatus,
    createdAt: Date,
    updatedAt: Date
  ): Result<OrderPayment> {
    return OrderPayment.new(
      id,
      orderId,
      orderPaymentStatus,
      new Date(),
      new Date()
    );
  }

  instanceOutbound(
    orderPaymentOutboundResponse: OrderPaymentOutboundResponse
  ): Result<OrderPayment> {
    let { id, orderId, orderPaymentStatus, createdAt, updatedAt } =
      orderPaymentOutboundResponse;

    return OrderPayment.new(
      OrderPaymentId.new(id).get(),
      OrderId.new(orderId).get(),
      OrderPaymentStatus.findByValue(orderPaymentStatus).get(),
      createdAt,
      updatedAt
    );
  }
}
