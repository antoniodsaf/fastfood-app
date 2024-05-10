import { Order } from '@app/core/domain/order/order';
import { Result } from '@util/result';
import { CreateOrderInboundRequest } from './dto/create.order.inbound.request';

export interface CreateOrderService {
  create(
    createOrderInboundRequest: CreateOrderInboundRequest
  ): Promise<Result<Order>>;
}
