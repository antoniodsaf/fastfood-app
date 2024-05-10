import { Order } from '@app/core/domain/order/order';
import { OrderDomainMapper } from '@app/mapper/order/order.domain.mapper';
import { FindOrderService } from '@app/port/inbound/order/find.order.service';
import { OrderOutboundResponse } from '@app/port/outbound/order/dto/order.outbound.response';
import { OrderRepository } from '@app/port/outbound/order/order.repository';
import { Result } from '@util/result';

export class FindOrderUseCase implements FindOrderService {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly orderDomainMapper: OrderDomainMapper
  ) {}

  async findOrdersOrderedByStatusAndCreatedAt(): Promise<Result<Order[]>> {
    const orders =
      await this.orderRepository.findOrdersOrderedByStatusAndCreatedAt();
    const outbound = orders.map((it) => {
      return this.toOrder(it).get();
    });

    return Result.success(outbound);
  }

  private toOrder(orderOutboundResponse: OrderOutboundResponse): Result<Order> {
    return this.orderDomainMapper.instanceOutbound(orderOutboundResponse);
  }
}
