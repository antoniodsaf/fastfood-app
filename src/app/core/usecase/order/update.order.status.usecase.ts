import { Order } from '@app/core/domain/order/order';
import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderStatus } from '@app/core/domain/order/valueobject/order.status';
import { OrderDomainMapper } from '@app/mapper/order/order.domain.mapper';
import { UpdateOrderStatusInboundRequest } from '@app/port/inbound/order/dto/update.order.status.inbound.request';
import { UpdateOrderStatusService } from '@app/port/inbound/order/update.order.status.service';
import { OrderOutboundResponse } from '@app/port/outbound/order/dto/order.outbound.response';
import { OrderRepository } from '@app/port/outbound/order/order.repository';
import { Result, failure } from '@util/result';
import { OrderNotFoundException } from '../exception/order/order.not.found.exception';

export class UpdateOrderStatusUseCase implements UpdateOrderStatusService {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly orderDomainMapper: OrderDomainMapper
  ) {}

  async update(
    id: string,
    updateOrderStatusInboundRequest: UpdateOrderStatusInboundRequest
  ): Promise<Result<Order>> {
    const newStatus = OrderStatus.findByValue(
      updateOrderStatusInboundRequest.status
    );

    const orderId = OrderId.new(id);

    const order = await this.find(orderId.get());
    return await this.updateOrderStatus(order.get(), newStatus.get());
  }

  private async find(orderId: OrderId): Promise<Result<Order>> {
    const orderOutboundResponse = await this.orderRepository.findById(orderId);
    if (!orderOutboundResponse) {
      return failure(
        new OrderNotFoundException(`OrderId='${orderId.value}' not found.`)
      );
    }

    return this.toOrder(orderOutboundResponse);
  }

  private async updateOrderStatus(
    order: Order,
    newStatus: OrderStatus
  ): Promise<Result<Order>> {
    const updatedOrder = order.updateStatus(newStatus);

    return this.toOrder(await this.orderRepository.save(updatedOrder));
  }

  private toOrder(orderOutboundResponse: OrderOutboundResponse): Result<Order> {
    return this.orderDomainMapper.instanceOutbound(orderOutboundResponse);
  }
}
