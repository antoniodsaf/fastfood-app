import { Product } from "@app/core/domain/product/product";
import { CreateProductInboundRequest } from "@app/port/inbound/product/dto/create.product.inbound.request";
import { UpdateProductInboundRequest } from "@app/port/inbound/product/dto/update.product.inbound.request";
import { ProductOutboundResponse } from "@app/port/outbound/product/dto/product.outbound.response";
import { Result } from "@util/result";

export interface ProductDomainMapper {
  instanceInbound(
    createProductInboundRequest: CreateProductInboundRequest,
    id: string,
    createdAt: Date,
    updatedAt: Date,
    disabled: boolean
  ): Result<Product>;

  instanceOutbound(
    productOutboundResponse: ProductOutboundResponse
  ): Result<Product>;

  update(
    updateProductInboundRequest: UpdateProductInboundRequest,
    product: Product
  ): Result<Product>;
}
