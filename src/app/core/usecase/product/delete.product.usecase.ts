import { Product } from "@app/core/domain/product/product";
import { ProductId } from "@app/core/domain/product/valueobject/product.id";
import { ProductDomainMapper } from "@app/mapper/product/product.domain.mapper";
import { DeleteProductService } from "@app/port/inbound/product/delete.product.service";
import { ProductOutboundResponse } from "@app/port/outbound/product/dto/product.outbound.response";
import { ProductRepository } from "@app/port/outbound/product/product.repository";
import { Result, failure } from "@util/result";
import { ProductNotFoundException } from "../exception/product/product.not.found.exception";

export class DeleteProductUseCase implements DeleteProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productDomainMapper: ProductDomainMapper
  ) {}

  async delete(id: string): Promise<Result<void>> {
    const productId = ProductId.new(id);
    const productOutboundResponse = await this.productRepository.find(
      productId.get().value,
      false
    );
    if (!productOutboundResponse) {
      return failure(new ProductNotFoundException('Product not found.'));
    }
    const product = [productOutboundResponse]
      .map((it) => this.toProduct(it).toDisabled())
      .pop();
    await this.productRepository.persist(product);
  }

  toProduct(productOutboundResponse: ProductOutboundResponse): Product {
    return this.productDomainMapper
      .instanceOutbound(productOutboundResponse)
      .get();
  }
}
