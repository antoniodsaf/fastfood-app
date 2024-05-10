import { Product } from "@app/core/domain/product/product";
import { ProductCategory } from "@app/core/domain/product/valueobject/product.category";
import { ProductId } from "@app/core/domain/product/valueobject/product.id";
import { ProductDomainMapper } from "@app/mapper/product/product.domain.mapper";
import { FindProductService } from "@app/port/inbound/product/find.product.service";
import { ProductOutboundResponse } from "@app/port/outbound/product/dto/product.outbound.response";
import { ProductRepository } from "@app/port/outbound/product/product.repository";
import { Result, success, failure } from "@util/result";
import { ProductNotFoundException } from "../exception/product/product.not.found.exception";

export class FindProductUseCase implements FindProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productDomainMapper: ProductDomainMapper
  ) {}

  async findAll(
    productCategory: string,
    disabled: boolean
  ): Promise<Result<Product[]>> {
    const category = ProductCategory.instance(productCategory);
    const products = await this.productRepository.findByCategory(
      category.get(),
      disabled
    );
    return success(products.map((it) => this.toProduct(it).get()));
  }

  async find(id: string, disabled: boolean): Promise<Result<Product>> {
    const productId = ProductId.new(id);
    const productOutbound = await this.productRepository.find(
      productId.get().value,
      disabled
    );
    if (!productOutbound) {
      return failure(new ProductNotFoundException('Product not found.'));
    }
    return this.toProduct(productOutbound);
  }

  toProduct(productOutboundResponse: ProductOutboundResponse): Result<Product> {
    return this.productDomainMapper.instanceOutbound(productOutboundResponse);
  }
}
