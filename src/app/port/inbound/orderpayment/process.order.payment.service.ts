import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { Result } from '@util/result';
import { ProcessOrderPaymentInboundRequest } from './dto/process.order.payment.inbound.request';

export interface ProcessOrderPaymentService {
  execute(
    processOrderPaymentInboundRequest: ProcessOrderPaymentInboundRequest
  ): Promise<Result<OrderPayment>>;
}
