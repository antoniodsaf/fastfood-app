import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { Result } from '@util/result';
import { FindOrderPaymentStatusInboundRequest } from './dto/find.order.payment.status.inbound.request';

export interface FindOrderPaymentStatusService {
  execute(
    findOrderPaymentStatusRequest: FindOrderPaymentStatusInboundRequest
  ): Promise<Result<OrderPayment>>;
}
