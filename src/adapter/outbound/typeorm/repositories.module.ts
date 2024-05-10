import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTypeOrmRepository } from './customer.typeorm.repository';
import { CustomerEntity } from './entity/customer.entity';
import { OrderEntity } from './entity/order.entity';
import { OrderItemEntity } from './entity/order.item.entity';
import { OrderPaymentEntity } from './entity/order.payment.entity';
import { ProductEntity } from './entity/product.entity';
import { OrderItemTypeOrmRepository } from './order.item.typeorm.repository';
import { OrderPaymentTypeOrmRepository } from './order.payment.typeorm.repository';
import { OrderTypeOrmRepository } from './order.typeorm.repository';
import { ProductTypeOrmRepository } from './product.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      ProductEntity,
      OrderEntity,
      OrderItemEntity,
      OrderPaymentEntity
    ])
  ],
  exports: [
    CustomerTypeOrmRepository,
    ProductTypeOrmRepository,
    OrderTypeOrmRepository,
    OrderItemTypeOrmRepository,
    OrderPaymentTypeOrmRepository
  ],
  providers: [
    CustomerTypeOrmRepository,
    ProductTypeOrmRepository,
    OrderTypeOrmRepository,
    OrderItemTypeOrmRepository,
    OrderPaymentTypeOrmRepository
  ]
})
export class RepositoriesModule {}
