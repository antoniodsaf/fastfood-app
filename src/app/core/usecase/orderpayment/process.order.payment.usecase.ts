import { OrderPayment } from "@app/core/domain/orderpayment/order.payment";
import { OrderPaymentDomainMapper } from "@app/mapper/orderpayment/order.payment.domain.mapper";
import { FindOrderPaymentStatusInboundRequest } from "@app/port/inbound/orderpayment/dto/find.order.payment.status.inbound.request";
import { ProcessOrderPaymentInboundRequest } from "@app/port/inbound/orderpayment/dto/process.order.payment.inbound.request";
import { FindOrderPaymentStatusService } from "@app/port/inbound/orderpayment/find.order.payment.status.service";
import { ProcessOrderPaymentService } from "@app/port/inbound/orderpayment/process.order.payment.service";
import { OrderPaymentRepository } from "@app/port/outbound/orderpayment/order.payment.repository";
import { Result } from "@util/result";


export class ProcessOrderPaymentUseCase implements ProcessOrderPaymentService {
  constructor(
    readonly orderPaymentRepository: OrderPaymentRepository,
    readonly orderPaymentDomainMapper: OrderPaymentDomainMapper,
    readonly consultOrderPaymentStatusService: FindOrderPaymentStatusService
  ) {}

  async execute(
    processOrderPaymentInboundRequest: ProcessOrderPaymentInboundRequest
  ): Promise<Result<OrderPayment>> {
    const orderPayment = await this.consultOrderPaymentStatusService.execute(
      new FindOrderPaymentStatusInboundRequest(
        processOrderPaymentInboundRequest.orderId
      )
    );

    const updatedOrderPayment = orderPayment
      .get()
      .payment(processOrderPaymentInboundRequest.paid);

    const orderPaymentOutboundResponse =
      await this.orderPaymentRepository.save(updatedOrderPayment);

    return this.orderPaymentDomainMapper.instanceOutbound(
      orderPaymentOutboundResponse
    );
  }
}
