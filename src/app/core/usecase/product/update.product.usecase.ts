import { Product } from "@app/core/domain/product/product";
import { ProductId } from "@app/core/domain/product/valueobject/product.id";
import { ProductDomainMapper } from "@app/mapper/product/product.domain.mapper";
import { UpdateProductInboundRequest } from "@app/port/inbound/product/dto/update.product.inbound.request";
import { UpdateProductService } from "@app/port/inbound/product/update.product.service";
import { ProductOutboundResponse } from "@app/port/outbound/product/dto/product.outbound.response";
import { ProductRepository } from "@app/port/outbound/product/product.repository";
import { Result, failure } from "@util/result";
import { ProductNotFoundException } from "../exception/product/product.not.found.exception";

export class UpdateProductUseCase implements UpdateProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productDomainMapper: ProductDomainMapper
  ) {}

  async update(
    id: string,
    updateProductInboundRequest: UpdateProductInboundRequest
  ): Promise<Result<Product>> {
    const productFromDatabase = await this.findActiveProduct(id);
    const productUpdated = this.productDomainMapper.update(
      updateProductInboundRequest,
      productFromDatabase.get()
    );
    return this.transformToProduct(
      await this.productRepository.persist(productUpdated.get())
    );
  }

  private async findActiveProduct(idValue: string): Promise<Result<Product>> {
    const productId = ProductId.new(idValue);
    const productOutboundResponse = await this.productRepository.find(
      productId.get().value,
      false
    );
    if (productOutboundResponse) {
      this.transformToProduct(productOutboundResponse);
    }
    return failure(new ProductNotFoundException('Product not found.'));
  }

  transformToProduct(
    productOutboundResponse: ProductOutboundResponse
  ): Result<Product> {
    return this.productDomainMapper.instanceOutbound(productOutboundResponse);
  }
}
