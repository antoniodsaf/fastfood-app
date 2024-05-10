import { OrderItem } from '@app/core/domain/order/order.item';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemResponse {
  readonly id: string;
  readonly productName: string;
  readonly productPrice: number;
  readonly quantity: number;
  readonly price: number;

  constructor(
    id: string,
    productName: string,
    productPrice: number,
    quantity: number,
    price: number
  ) {
    this.id = id;
    this.productName = productName;
    this.productPrice = productPrice;
    this.quantity = quantity;
    this.price = price;
  }

  static from(orderItem: OrderItem): OrderItemResponse {
    return new OrderItemResponse(
      orderItem.id.value,
      orderItem.productName.value,
      orderItem.productPrice.value,
      orderItem.quantity.value,
      orderItem.price.value
    );
  }
}
