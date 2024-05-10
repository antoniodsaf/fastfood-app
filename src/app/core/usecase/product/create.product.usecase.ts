import { Product } from "@app/core/domain/product/product";
import { ProductId } from "@app/core/domain/product/valueobject/product.id";
import { ProductDomainMapper } from "@app/mapper/product/product.domain.mapper";
import { CreateProductService } from "@app/port/inbound/product/create.product.service";
import { CreateProductInboundRequest } from "@app/port/inbound/product/dto/create.product.inbound.request";
import { ProductOutboundResponse } from "@app/port/outbound/product/dto/product.outbound.response";
import { ProductRepository } from "@app/port/outbound/product/product.repository";
import { Result } from "@util/result";


export class CreateProductUseCase implements CreateProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productDomainMapper: ProductDomainMapper
  ) {}

  async create(
    createProductInboundRequest: CreateProductInboundRequest
  ): Promise<Result<Product>> {
    const result = this.newProduct(createProductInboundRequest);
    return this.transformToProduct(
      await this.productRepository.persist(result.get())
    );
  }

  newProduct(
    createProductInboundRequest: CreateProductInboundRequest
  ): Result<Product> {
    const now = new Date();
    const disabled = false;
    const id = ProductId.generate();
    return this.productDomainMapper.instanceInbound(
      createProductInboundRequest,
      id,
      now,
      now,
      disabled
    );
  }

  transformToProduct(
    productOutboundResponse: ProductOutboundResponse
  ): Result<Product> {
    return this.productDomainMapper.instanceOutbound(productOutboundResponse);
  }
}
