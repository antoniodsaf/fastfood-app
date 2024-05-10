import { OrderController } from '@adapter/inbound/controller/order/order.controller';
import { OrderDatabaseRepository } from '@adapter/outbound/database/order.db.repository';
import { OrderEntity } from '@adapter/outbound/typeorm/entity/order.entity';
import { OrderItemEntity } from '@adapter/outbound/typeorm/entity/order.item.entity';
import { OrderItemTypeOrmRepository } from '@adapter/outbound/typeorm/order.item.typeorm.repository';
import { OrderTypeOrmRepository } from '@adapter/outbound/typeorm/order.typeorm.repository';
import { RepositoriesModule } from '@adapter/outbound/typeorm/repositories.module';
import { CreateOrderUseCase } from '@app/core/usecase/order/create.order.usecase';
import { FindOrderUseCase } from '@app/core/usecase/order/find.order.usecase';
import { UpdateOrderStatusUseCase } from '@app/core/usecase/order/update.order.status.usecase';
import { DefaultOrderDomainMapper } from '@app/mapper/order/default.order.domain.mapper';
import { CreateOrderPaymentService } from '@app/port/inbound/orderpayment/create.order.payment.service';
import { FindProductService } from '@app/port/inbound/product/find.product.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { FindCustomerService } from './../app/port/inbound/customer/find.customer.service';
import {
  CustomerPortConfigModule,
  FIND_CUSTOMER_SERVICE_TOKEN,
  customerDomainMapper,
  customerRepository,
  findCustomerService
} from './customer.port.config';
import {
  FIND_PRODUCT_SERVICE_TOKEN,
  ProductPortConfigModule,
  findProductService,
  productDomainMapper,
  productRepository
} from './product.port.config';
import {
  CREATE_ORDER_PAYMENT_SERVICE_TOKEN,
  OrderPaymentPortConfigModule,
  createOrderPaymentService,
  orderPaymentDomainMapper,
  orderPaymentRepository
} from './order.payment.port.config';

const ORDER_REPOSITORY_TOKEN = 'OrderRepository';
const ORDER_DOMAIN_MAPPER_TOKEN = 'OrderDomainMapper';
const CREATE_ORDER_SERVICE_TOKEN = 'CreateOrderService';
const FIND_ORDER_SERVICE_TOKEN = 'FindOrderService';
const UPDATE_ORDER_STATUS_SERVICE_TOKEN = 'UpdateOrderStatusService';

const domainMapper = {
  provide: ORDER_DOMAIN_MAPPER_TOKEN,
  useFactory: () => {
    return new DefaultOrderDomainMapper();
  }
};

const repository = {
  provide: ORDER_REPOSITORY_TOKEN,
  inject: [
    getRepositoryToken(OrderTypeOrmRepository),
    getRepositoryToken(OrderItemTypeOrmRepository)
  ],
  useFactory: async (
    orderTypeOrmRepository: OrderTypeOrmRepository,
    orderItemTypeOrmRepository: OrderItemTypeOrmRepository
  ) => {
    return new OrderDatabaseRepository(
      orderTypeOrmRepository,
      orderItemTypeOrmRepository
    );
  }
};

const createService = (token: string, clazz: any) => {
  return {
    provide: token,
    useFactory: async (
      orderRepository: OrderDatabaseRepository,
      orderDomainMapper: DefaultOrderDomainMapper
    ) => {
      return new clazz(orderRepository, orderDomainMapper);
    },
    inject: [
      { token: ORDER_REPOSITORY_TOKEN, optional: false },
      { token: ORDER_DOMAIN_MAPPER_TOKEN, optional: false }
    ]
  };
};

const createOrderService = (token: string, clazz: any) => {
  return {
    provide: token,
    useFactory: async (
      orderRepository: OrderDatabaseRepository,
      orderDomainMapper: DefaultOrderDomainMapper,
      findCustomerService: FindCustomerService,
      findProductService: FindProductService,
      createOrderPaymentService: CreateOrderPaymentService
    ) => {
      return new clazz(
        orderRepository,
        orderDomainMapper,
        findCustomerService,
        findProductService,
        createOrderPaymentService
      );
    },
    inject: [
      { token: ORDER_REPOSITORY_TOKEN, optional: false },
      { token: ORDER_DOMAIN_MAPPER_TOKEN, optional: false },
      { token: FIND_CUSTOMER_SERVICE_TOKEN, optional: false },
      { token: FIND_PRODUCT_SERVICE_TOKEN, optional: false },
      { token: CREATE_ORDER_PAYMENT_SERVICE_TOKEN, optional: false }
    ]
  };
};

const toProvide = [
  createOrderService(CREATE_ORDER_SERVICE_TOKEN, CreateOrderUseCase),
  createService(FIND_ORDER_SERVICE_TOKEN, FindOrderUseCase),
  createService(UPDATE_ORDER_STATUS_SERVICE_TOKEN, UpdateOrderStatusUseCase),
  findCustomerService,
  findProductService,
  createOrderPaymentService,
  customerRepository,
  productRepository,
  orderPaymentRepository,
  customerDomainMapper,
  productDomainMapper,
  orderPaymentDomainMapper
];

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    RepositoriesModule,
    CustomerPortConfigModule,
    ProductPortConfigModule,
    OrderPaymentPortConfigModule
  ],
  controllers: [OrderController],
  providers: [
    OrderTypeOrmRepository,
    OrderItemTypeOrmRepository,
    domainMapper,
    repository,
    ...toProvide
  ]
})
export class OrderPortConfigModule {}
