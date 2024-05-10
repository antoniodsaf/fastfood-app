import { Product } from 'src/app/core/domain/product/product';
import { ProductOutboundResponse } from 'src/app/port/outbound/product/dto/product.outbound.response';
import { ProductRepository } from 'src/app/port/outbound/product/product.repository';
import { ProductEntity } from '../typeorm/entity/product.entity';
import { ProductTypeOrmRepository } from '../typeorm/product.typeorm.repository';
import { ProductCategory } from 'src/app/core/domain/product/valueobject/product.category';

export class ProductDatabaseRepository implements ProductRepository {
  constructor(
    private readonly productTypeOrmRepository: ProductTypeOrmRepository
  ) {}

  async findByCategory(
    productCategory: ProductCategory,
    disabled: boolean
  ): Promise<ProductOutboundResponse[]> {
    return (
      await this.productTypeOrmRepository.find({
        where: { category: productCategory.toString(), disabled }
      })
    ).map((it) => it.toOutbound());
  }

  async persist(product: Product): Promise<ProductOutboundResponse> {
    return (
      await this.productTypeOrmRepository.save(ProductEntity.from(product))
    ).toOutbound();
  }

  async find(
    id: string,
    disabled: boolean
  ): Promise<ProductOutboundResponse | undefined> {
    return (
      await this.productTypeOrmRepository.findOne({ where: { id, disabled } })
    )?.toOutbound();
  }

  async exists(id: string): Promise<boolean> {
    return await this.productTypeOrmRepository.existsBy({ id });
  }
}
