import { Product } from '@app/core/domain/product/product';
import { Result } from '@util/result';

export interface FindProductService {
  findAll(
    productCategory: string,
    disabled: boolean
  ): Promise<Result<Product[]>>;
  find(id: string, disabled: boolean): Promise<Result<Product>>;
}
