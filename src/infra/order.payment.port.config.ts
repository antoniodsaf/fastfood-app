import { OrderPaymentController } from '@adapter/inbound/controller/orderpayment/order.payment.controller';
import { OrderPaymentDatabaseRepository } from '@adapter/outbound/database/order.payment.db.repository';
import { OrderPaymentEntity } from '@adapter/outbound/typeorm/entity/order.payment.entity';
import { OrderPaymentTypeOrmRepository } from '@adapter/outbound/typeorm/order.payment.typeorm.repository';
import { RepositoriesModule } from '@adapter/outbound/typeorm/repositories.module';
import { CreateOrderPaymentUseCase } from '@app/core/usecase/orderpayment/create.order.payment.usecase';
import { FindOrderPaymentStatusUseCase } from '@app/core/usecase/orderpayment/find.order.payment.status.usecase';
import { ProcessOrderPaymentUseCase } from '@app/core/usecase/orderpayment/process.order.payment.usecase';
import { DefaultOrderPaymentDomainMapper } from '@app/mapper/orderpayment/default.order.payment.domain.mapper';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { FindOrderPaymentStatusService } from '../app/port/inbound/orderpayment/find.order.payment.status.service';

const ORDER_PAYMENT_REPOSITORY_TOKEN = 'OrderPaymentRepository';
const ORDER_PAYMENT_DOMAIN_MAPPER_TOKEN = 'OrderPaymentDomainMapper';
export const CREATE_ORDER_PAYMENT_SERVICE_TOKEN = 'CreateOrderPaymentService';
const FIND_ORDER_PAYMENT_STATUS_SERVICE_TOKEN = 'FindOrderPaymentStatusService';
const PROCESS_ORDER_PAYMENT_SERVICE_TOKEN = 'ProcessOrderPaymentService';

export const orderPaymentDomainMapper = {
  provide: ORDER_PAYMENT_DOMAIN_MAPPER_TOKEN,
  useFactory: () => {
    return new DefaultOrderPaymentDomainMapper();
  }
};

export const orderPaymentRepository = {
  provide: ORDER_PAYMENT_REPOSITORY_TOKEN,
  inject: [getRepositoryToken(OrderPaymentTypeOrmRepository)],
  useFactory: async (
    orderPaymentTypeOrmRepository: OrderPaymentTypeOrmRepository
  ) => {
    return new OrderPaymentDatabaseRepository(orderPaymentTypeOrmRepository);
  }
};

const createService = (token: string, clazz: any) => {
  return {
    provide: token,
    useFactory: async (
      orderPaymentRepository: OrderPaymentDatabaseRepository,
      orderPaymentDomainMapper: DefaultOrderPaymentDomainMapper,
      findOrderPaymentStatusService: FindOrderPaymentStatusService
    ) => {
      return new clazz(
        orderPaymentRepository,
        orderPaymentDomainMapper,
        findOrderPaymentStatusService
      );
    },
    inject: [
      { token: ORDER_PAYMENT_REPOSITORY_TOKEN, optional: false },
      { token: ORDER_PAYMENT_DOMAIN_MAPPER_TOKEN, optional: false },
      { token: FIND_ORDER_PAYMENT_STATUS_SERVICE_TOKEN, optional: true }
    ]
  };
};

export const createOrderPaymentService = createService(
  CREATE_ORDER_PAYMENT_SERVICE_TOKEN,
  CreateOrderPaymentUseCase
);

const toProvide = [
  createOrderPaymentService,
  createService(
    FIND_ORDER_PAYMENT_STATUS_SERVICE_TOKEN,
    FindOrderPaymentStatusUseCase
  ),
  createService(PROCESS_ORDER_PAYMENT_SERVICE_TOKEN, ProcessOrderPaymentUseCase)
];

@Module({
  imports: [TypeOrmModule.forFeature([OrderPaymentEntity]), RepositoriesModule],
  controllers: [OrderPaymentController],
  providers: [
    OrderPaymentTypeOrmRepository,
    orderPaymentDomainMapper,
    orderPaymentRepository,
    ...toProvide
  ],
  exports: [createOrderPaymentService]
})
export class OrderPaymentPortConfigModule {}
