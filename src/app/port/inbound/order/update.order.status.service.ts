import { Order } from '@app/core/domain/order/order';
import { Result } from '@util/result';
import { UpdateOrderStatusInboundRequest } from './dto/update.order.status.inbound.request';

export interface UpdateOrderStatusService {
  update(
    id: string,
    updateOrderStatusInboundRequest: UpdateOrderStatusInboundRequest
  ): Promise<Result<Order>>;
}
