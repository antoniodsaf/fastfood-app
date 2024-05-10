import { Product } from '@app/core/domain/product/product';
import { Result } from '@util/result';
import { UpdateProductInboundRequest } from './dto/update.product.inbound.request';

export interface UpdateProductService {
  update(
    id: string,
    updateProductInboundRequest: UpdateProductInboundRequest
  ): Promise<Result<Product>>;
}
