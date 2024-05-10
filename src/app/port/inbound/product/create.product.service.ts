import { Product } from '@app/core/domain/product/product';
import { Result } from '@util/result';
import { CreateProductInboundRequest } from './dto/create.product.inbound.request';

export interface CreateProductService {
  create(
    createProductInboundRequest: CreateProductInboundRequest
  ): Promise<Result<Product>>;
}
