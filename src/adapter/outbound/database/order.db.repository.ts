import { Order } from '@app/core/domain/order/order';
import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderOutboundResponse } from '@app/port/outbound/order/dto/order.outbound.response';
import { OrderRepository } from '@app/port/outbound/order/order.repository';
import { OrderEntity } from '../typeorm/entity/order.entity';
import { OrderItemEntity } from '../typeorm/entity/order.item.entity';
import { OrderItemTypeOrmRepository } from '../typeorm/order.item.typeorm.repository';
import { OrderTypeOrmRepository } from '../typeorm/order.typeorm.repository';
import { OrderItem } from '@app/core/domain/order/order.item';

export class OrderDatabaseRepository implements OrderRepository {
  constructor(
    private readonly orderTypeOrmRepository: OrderTypeOrmRepository,
    private readonly orderItemTypeOrmRepository: OrderItemTypeOrmRepository
  ) {}

  async findOrdersOrderedByStatusAndCreatedAt(): Promise<
    OrderOutboundResponse[]
  > {
    return await Promise.all(
      (
        await this.orderTypeOrmRepository.findOrdersOrderedByStatusAndCreatedAt()
      ).map(async (entity: OrderEntity) => {
        const orderItemEntities =
          await this.orderItemTypeOrmRepository.findByOrderId(entity.id);
        return entity.toOutbound(orderItemEntities);
      })
    );
  }

  async findNumber(): Promise<number> {
    return await this.orderTypeOrmRepository.findNumber();
  }

  async save(order: Order): Promise<OrderOutboundResponse> {
    const savedOrderEntity = await this.orderTypeOrmRepository.save(
      OrderEntity.from(order)
    );

    const savedOrderItemEntities = await Promise.all(
      order.items.map(
        async (item: OrderItem) =>
          await this.orderItemTypeOrmRepository.save(
            OrderItemEntity.from(order.id, item)
          )
      )
    );
    return savedOrderEntity.toOutbound(savedOrderItemEntities);
  }

  async findAllOrders(): Promise<OrderOutboundResponse[]> {
    return await Promise.all(
      (await this.orderTypeOrmRepository.find()).map(
        async (entity: OrderEntity) => {
          const orderItemEntities =
            await this.orderItemTypeOrmRepository.findByOrderId(entity.id);
          return entity.toOutbound(orderItemEntities);
        }
      )
    );
  }

  async findById(orderId: OrderId): Promise<OrderOutboundResponse | null> {
    const foundEntity = await this.orderTypeOrmRepository.findById(
      orderId.value
    );
    return foundEntity.toOutbound(
      await this.orderItemTypeOrmRepository.findByOrderId(foundEntity.id)
    );
  }
}
