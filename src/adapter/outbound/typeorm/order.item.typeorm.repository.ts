import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderItemEntity } from './entity/order.item.entity';

@Injectable()
export class OrderItemTypeOrmRepository extends Repository<OrderItemEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderItemEntity, dataSource.createEntityManager());
  }

  async findByOrderId(orderId: string): Promise<OrderItemEntity[]> {
    return await super.find({ where: { orderId } });
  }
}
