import { Order } from '@app/core/domain/order/order';
import { OrderItemResponse } from './order.item.response';
import { ApiProperty } from '@nestjs/swagger';

export class OrderResponse {
  @ApiProperty({
    example: '3e74c924-89a8-412a-8a41-c5dec1878f03'
  })
  readonly id: string;
  @ApiProperty({
    example: 1
  })
  readonly number: number;
  @ApiProperty({
    example: '65183143463'
  })
  readonly cpf: string | null;
  @ApiProperty({
    example: [
      {
        id: '15bd8cd2-aaff-4289-b960-05b4b18e27e6',
        productName: 'Hamburger',
        productPrice: 25.5,
        quantity: 2,
        price: 50
      }
    ]
  })
  readonly orderItems: OrderItemResponse[];
  @ApiProperty({
    example: 50
  })
  readonly price: number;
  @ApiProperty({
    example: 'PREPARING',
    enum: ['RECEIVED', 'PREPARING', 'READY', 'FINISHED']
  })
  readonly orderStatus: string;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;

  constructor(
    id: string,
    number: number,
    cpf: string | null,
    orderItems: OrderItemResponse[],
    price: number,
    orderStatus: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.number = number;
    this.cpf = cpf;
    this.orderItems = orderItems;
    this.price = price;
    this.orderStatus = orderStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(order: Order): OrderResponse {
    return new OrderResponse(
      order.id.value,
      order.number.value,
      order.cpf?.value || null,
      order.items.map((item) => OrderItemResponse.from(item)),
      order.price.value,
      order.orderStatus.toString(),
      order.createdAt,
      order.updatedAt
    );
  }
}
