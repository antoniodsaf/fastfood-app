import { Order } from '@app/core/domain/order/order';
import { Result } from '@util/result';

export interface FindOrderService {
  findOrdersOrderedByStatusAndCreatedAt(): Promise<Result<Order[]>>;
}
