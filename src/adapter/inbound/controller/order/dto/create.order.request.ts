import { CreateOrderInboundRequest } from '@app/port/inbound/order/dto/create.order.inbound.request';
import { CreateOrderItemRequest } from './create.order.item.request';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequest {
  @ApiProperty({
    example: '65183143463',
    description:
      'Utilize um gerador de cpf online free, como https://www.geradordecpf.org/ para testes.'
  })
  cpf: string;
  @ApiProperty({
    example: [
      { productId: '516521e1-6765-4fe0-8ee1-261ce0a491c0', quantity: 1 },
      { productId: '5918363a7-f08f-437c-a47f-cd34a85ce1eb', quantity: 2 }
    ]
  })
  items: CreateOrderItemRequest[];

  toInbound(): CreateOrderInboundRequest {
    return new CreateOrderInboundRequest(
      this.cpf,
      this.items.map((item) => {
        return new CreateOrderItemRequest(
          item.productId,
          item.quantity
        ).toInbound();
      })
    );
  }
}
