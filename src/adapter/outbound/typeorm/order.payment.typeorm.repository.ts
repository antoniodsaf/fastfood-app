import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderPaymentEntity } from './entity/order.payment.entity';

@Injectable()
export class OrderPaymentTypeOrmRepository extends Repository<OrderPaymentEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderPaymentEntity, dataSource.createEntityManager());
  }

  async findByOrderId(orderId: string): Promise<OrderPaymentEntity> {
    return await super.findOne({ where: { orderId } });
  }
}
