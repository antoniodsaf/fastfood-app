import { OrderId } from "@app/core/domain/order/valueobject/order.id";
import { OrderPayment } from "@app/core/domain/orderpayment/order.payment";
import { OrderPaymentId } from "@app/core/domain/orderpayment/valueobject/order.payment.id";
import { OrderPaymentStatus } from "@app/core/domain/orderpayment/valueobject/order.payment.status";
import { OrderPaymentDomainMapper } from "@app/mapper/orderpayment/order.payment.domain.mapper";
import { CreateOrderPaymentService } from "@app/port/inbound/orderpayment/create.order.payment.service";
import { OrderPaymentOutboundResponse } from "@app/port/outbound/orderpayment/dto/order.payment.outbound.response";
import { OrderPaymentRepository } from "@app/port/outbound/orderpayment/order.payment.repository";
import { Result } from "@util/result";

export class CreateOrderPaymentUseCase implements CreateOrderPaymentService {
  constructor(
    readonly orderPaymentRepository: OrderPaymentRepository,
    readonly orderPaymentDomainMapper: OrderPaymentDomainMapper
  ) {}

  async execute(orderId: OrderId): Promise<Result<OrderPayment>> {
    const orderPayment = this.createOrderPayment(orderId);
    return this.saveOrderPayment(orderPayment.get());
  }

  private createOrderPayment(orderId: OrderId): Result<OrderPayment> {
    return this.orderPaymentDomainMapper.instance(
      OrderPaymentId.generate(),
      orderId,
      OrderPaymentStatus.WAITING,
      new Date(),
      new Date()
    );
  }

  private async saveOrderPayment(
    orderPayment: OrderPayment
  ): Promise<Result<OrderPayment>> {
    return this.toOrderPayment(
      await this.orderPaymentRepository.save(orderPayment)
    );
  }

  private toOrderPayment(
    orderPaymentOutboundResponse: OrderPaymentOutboundResponse
  ): Result<OrderPayment> {
    return this.orderPaymentDomainMapper.instanceOutbound(
      orderPaymentOutboundResponse
    );
  }
}
