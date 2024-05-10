import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { OrderPaymentDomainMapper } from '@app/mapper/orderpayment/order.payment.domain.mapper';
import { FindOrderPaymentStatusInboundRequest } from '@app/port/inbound/orderpayment/dto/find.order.payment.status.inbound.request';
import { FindOrderPaymentStatusService } from '@app/port/inbound/orderpayment/find.order.payment.status.service';
import { OrderPaymentRepository } from '@app/port/outbound/orderpayment/order.payment.repository';
import { Result } from '@util/result';
import { OrderPaymentNotFoundException } from '../exception/orderpayment/order.payment.not.found.exception';

export class FindOrderPaymentStatusUseCase
  implements FindOrderPaymentStatusService
{
  constructor(
    readonly orderPaymentRepository: OrderPaymentRepository,
    readonly orderPaymentDomainMapper: OrderPaymentDomainMapper
  ) {}

  async execute(
    findOrderPaymentStatusRequest: FindOrderPaymentStatusInboundRequest
  ): Promise<Result<OrderPayment>> {
    const orderId = OrderId.new(findOrderPaymentStatusRequest.orderId).get();

    const orderPaymentOutboundResponse =
      await this.orderPaymentRepository.findByOrderId(orderId);

    if (!orderPaymentOutboundResponse) {
      return Result.failure(
        new OrderPaymentNotFoundException(
          `OrderPayment for OrderId='${orderId.value}' not found.`
        )
      );
    }

    return this.orderPaymentDomainMapper.instanceOutbound(
      orderPaymentOutboundResponse
    );
  }
}
