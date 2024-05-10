import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { CustomerController } from 'src/adapter/inbound/controller/customer/customer.controller';
import { CustomerDatabaseRepository } from 'src/adapter/outbound/database/customer.db.repository';
import { CustomerTypeOrmRepository } from 'src/adapter/outbound/typeorm/customer.typeorm.repository';
import { CustomerEntity } from 'src/adapter/outbound/typeorm/entity/customer.entity';
import { RepositoriesModule } from 'src/adapter/outbound/typeorm/repositories.module';
import { CreateCustomerUseCase } from 'src/app/core/usecase/customer/create.customer.usecase';
import { FindCustomerUseCase } from 'src/app/core/usecase/customer/find.customer.usecase';
import { DefaultCustomerDomainMapper } from 'src/app/mapper/customer/default.customer.domain.mapper';

export const CUSTOMER_REPOSITORY_TOKEN = 'CustomerRepository';
export const CUSTOMER_DOMAIN_MAPPER_TOKEN = 'CustomerDomainMapper';
export const CREATE_CUSTOMER_SERVICE_TOKEN = 'CreateCustomerService';
export const FIND_CUSTOMER_SERVICE_TOKEN = 'FindCustomerService';

export const customerDomainMapper = {
  provide: CUSTOMER_DOMAIN_MAPPER_TOKEN,
  useFactory: () => {
    return new DefaultCustomerDomainMapper();
  }
};

export const customerRepository = {
  provide: CUSTOMER_REPOSITORY_TOKEN,
  inject: [getRepositoryToken(CustomerTypeOrmRepository)],
  useFactory: async (customerTypeOrmRepository: CustomerTypeOrmRepository) => {
    return new CustomerDatabaseRepository(customerTypeOrmRepository);
  }
};

const createCustomerService = {
  provide: CREATE_CUSTOMER_SERVICE_TOKEN,
  useFactory: async (
    customerRepository: CustomerDatabaseRepository,
    customerDomainMapper: DefaultCustomerDomainMapper
  ) => {
    return new CreateCustomerUseCase(customerRepository, customerDomainMapper);
  },
  inject: [
    { token: CUSTOMER_REPOSITORY_TOKEN, optional: false },
    { token: CUSTOMER_DOMAIN_MAPPER_TOKEN, optional: false }
  ]
};

export const findCustomerService = {
  provide: FIND_CUSTOMER_SERVICE_TOKEN,
  useFactory: async (
    customerRepository: CustomerDatabaseRepository,
    customerDomainMapper: DefaultCustomerDomainMapper
  ) => {
    return new FindCustomerUseCase(customerRepository, customerDomainMapper);
  },
  inject: [
    { token: CUSTOMER_REPOSITORY_TOKEN, optional: false },
    { token: CUSTOMER_DOMAIN_MAPPER_TOKEN, optional: false }
  ]
};

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), RepositoriesModule],
  controllers: [CustomerController],
  providers: [
    CustomerTypeOrmRepository,
    customerDomainMapper,
    customerRepository,
    createCustomerService,
    findCustomerService
  ],
  exports: [findCustomerService]
})
export class CustomerPortConfigModule {}
