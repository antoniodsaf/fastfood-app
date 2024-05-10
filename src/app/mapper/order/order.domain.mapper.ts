import { Cpf } from '@app/core/domain/customer/valueobject/cpf';
import { Order } from '@app/core/domain/order/order';
import { OrderItem } from '@app/core/domain/order/order.item';
import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderItemId } from '@app/core/domain/order/valueobject/order.item.id';
import { OrderItemQuantity } from '@app/core/domain/order/valueobject/order.item.quantity';
import { OrderNumber } from '@app/core/domain/order/valueobject/order.number';
import { OrderStatus } from '@app/core/domain/order/valueobject/order.status';
import { Product } from '@app/core/domain/product/product';
import { OrderItemOutboundResponse } from '@app/port/outbound/order/dto/order.item.outbound.response';
import { OrderOutboundResponse } from '@app/port/outbound/order/dto/order.outbound.response';
import { Result } from '@util/result';

export interface OrderDomainMapper {
  instance(
    id: OrderId,
    orderNumber: OrderNumber,
    items: OrderItem[],
    orderStatus: OrderStatus,
    createdAt: Date,
    updatedAt: Date,
    nullableCpf?: Cpf
  ): Result<Order>;

  instanceItem(
    id: OrderItemId,
    product: Product,
    quantity: OrderItemQuantity
  ): Result<OrderItem>;

  instanceOutbound(orderOutboundResponse: OrderOutboundResponse): Result<Order>;

  instanceItemOutbound(
    orderItemOutboundResponse: OrderItemOutboundResponse
  ): Result<OrderItem>;
}
