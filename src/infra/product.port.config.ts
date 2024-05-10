import { ProductController } from '@adapter/inbound/controller/product/product.controller';
import { ProductDatabaseRepository } from '@adapter/outbound/database/product.db.repository';
import { ProductEntity } from '@adapter/outbound/typeorm/entity/product.entity';
import { ProductTypeOrmRepository } from '@adapter/outbound/typeorm/product.typeorm.repository';
import { RepositoriesModule } from '@adapter/outbound/typeorm/repositories.module';
import { CreateProductUseCase } from '@app/core/usecase/product/create.product.usecase';
import { DeleteProductUseCase } from '@app/core/usecase/product/delete.product.usecase';
import { FindProductUseCase } from '@app/core/usecase/product/find.product.usecase';
import { UpdateProductUseCase } from '@app/core/usecase/product/update.product.usecase';
import { DefaultProductDomainMapper } from '@app/mapper/product/default.product.domain.mapper';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

export const PRODUCT_REPOSITORY_TOKEN = 'ProductRepository';
export const PRODUCT_DOMAIN_MAPPER_TOKEN = 'ProductDomainMapper';
export const CREATE_PRODUCT_SERVICE_TOKEN = 'CreateProductService';
export const FIND_PRODUCT_SERVICE_TOKEN = 'FindProductService';
export const UPDATE_PRODUCT_SERVICE_TOKEN = 'UpdateProductService';
export const DELETE_PRODUCT_SERVICE_TOKEN = 'DeleteProductService';

export const productDomainMapper = {
  provide: PRODUCT_DOMAIN_MAPPER_TOKEN,
  useFactory: () => {
    return new DefaultProductDomainMapper();
  }
};

export const productRepository = {
  provide: PRODUCT_REPOSITORY_TOKEN,
  inject: [getRepositoryToken(ProductTypeOrmRepository)],
  useFactory: async (customerTypeOrmRepository: ProductTypeOrmRepository) => {
    return new ProductDatabaseRepository(customerTypeOrmRepository);
  }
};

const createService = (token: string, clazz: any) => {
  return {
    provide: token,
    useFactory: async (
      customerRepository: ProductDatabaseRepository,
      customerDomainMapper: DefaultProductDomainMapper
    ) => {
      return new clazz(customerRepository, customerDomainMapper);
    },
    inject: [
      { token: PRODUCT_REPOSITORY_TOKEN, optional: false },
      { token: PRODUCT_DOMAIN_MAPPER_TOKEN, optional: false }
    ]
  };
};

export const findProductService = createService(
  FIND_PRODUCT_SERVICE_TOKEN,
  FindProductUseCase
);

const services = [
  createService(CREATE_PRODUCT_SERVICE_TOKEN, CreateProductUseCase),
  createService(UPDATE_PRODUCT_SERVICE_TOKEN, UpdateProductUseCase),
  createService(DELETE_PRODUCT_SERVICE_TOKEN, DeleteProductUseCase),
  findProductService
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), RepositoriesModule],
  controllers: [ProductController],
  providers: [
    ProductTypeOrmRepository,
    productDomainMapper,
    productRepository,
    ...services
  ]
})
export class ProductPortConfigModule {}
