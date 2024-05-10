import { Product } from '@app/core/domain/product/product';
import { ProductCategory } from '@app/core/domain/product/valueobject/product.category';
import { ProductOutboundResponse } from './dto/product.outbound.response';

export interface ProductRepository {
  persist(product: Product): Promise<ProductOutboundResponse>;
  find(
    id: string,
    disabled: boolean
  ): Promise<ProductOutboundResponse | undefined>;
  findByCategory(
    productCategory: ProductCategory,
    disabled: boolean
  ): Promise<ProductOutboundResponse[] | undefined>;
}
