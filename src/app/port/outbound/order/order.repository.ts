import { Order } from '@app/core/domain/order/order';
import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderOutboundResponse } from './dto/order.outbound.response';

export interface OrderRepository {
  findNumber(): Promise<number>;
  save(order: Order): Promise<OrderOutboundResponse>;
  findAllOrders(): Promise<OrderOutboundResponse[]>;
  findOrdersOrderedByStatusAndCreatedAt(): Promise<OrderOutboundResponse[]>;
  findById(orderId: OrderId): Promise<OrderOutboundResponse | null>;
}
