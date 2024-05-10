import { UpdateProductInboundRequest } from 'src/app/port/inbound/product/dto/update.product.inbound.request';

export class UpdateProductRequest {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly category: string
  ) {}
  toInbound() {
    return new UpdateProductInboundRequest(
      this.name,
      this.price,
      this.category,
      this.description
    );
  }
}
