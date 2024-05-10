import { Product } from "@app/core/domain/product/product";
import { ProductCategory } from "@app/core/domain/product/valueobject/product.category";
import { ProductDescription } from "@app/core/domain/product/valueobject/product.description";
import { ProductId } from "@app/core/domain/product/valueobject/product.id";
import { ProductName } from "@app/core/domain/product/valueobject/product.name";
import { ProductPrice } from "@app/core/domain/product/valueobject/product.price";
import { CreateProductInboundRequest } from "@app/port/inbound/product/dto/create.product.inbound.request";
import { UpdateProductInboundRequest } from "@app/port/inbound/product/dto/update.product.inbound.request";
import { ProductOutboundResponse } from "@app/port/outbound/product/dto/product.outbound.response";
import { Result, success } from "@util/result";
import { ProductDomainMapper } from "./product.domain.mapper";

export class DefaultProductDomainMapper implements ProductDomainMapper {
  instanceOutbound(productOutboundResponse: ProductOutboundResponse) {
    return Product.new(
      ProductId.new(productOutboundResponse.id).get(),
      ProductName.new(productOutboundResponse.name).get(),
      ProductPrice.new(productOutboundResponse.price).get(),
      ProductCategory.instance(productOutboundResponse.category).get(),
      ProductDescription.new(productOutboundResponse.description).get(),
      productOutboundResponse.createdAt,
      productOutboundResponse.updatedAt,
      productOutboundResponse.disabled
    );
  }

  instanceInbound(
    createProductInboundRequest?: CreateProductInboundRequest,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    disabled?: boolean
  ): Result<Product> {
    return Product.new(
      ProductId.new(id).get(),
      ProductName.new(createProductInboundRequest.name).get(),
      ProductPrice.new(createProductInboundRequest.price).get(),
      ProductCategory.instance(createProductInboundRequest.category).get(),
      ProductDescription.new(createProductInboundRequest.description).get(),
      createdAt,
      updatedAt,
      disabled
    );
  }

  update(
    updateProductInboundRequest: UpdateProductInboundRequest,
    product: Product
  ): Result<Product> {
    return success(
      product.updateValues(
        ProductName.new(updateProductInboundRequest.name).get(),
        ProductPrice.new(updateProductInboundRequest.price).get(),
        ProductCategory.instance(updateProductInboundRequest.category).get(),
        ProductDescription.new(updateProductInboundRequest.description).get()
      )
    );
  }
}
