import { CreateOrderItemInboundRequest } from '@app/port/inbound/order/dto/create.order.item.inbound.request';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemRequest {
  @ApiProperty()
  readonly productId: string;
  @ApiProperty()
  readonly quantity: number;

  constructor(productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }

  toInbound(): CreateOrderItemInboundRequest {
    return new CreateOrderItemInboundRequest(this.productId, this.quantity);
  }
}
