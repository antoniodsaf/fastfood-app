import { Result } from '@util/result';
import { Cpf } from '../customer/valueobject/cpf';
import { OrderId } from './valueobject/order.id';
import { OrderNumber } from './valueobject/order.number';
import { OrderPrice } from './valueobject/order.price';
import { OrderStatus } from './valueobject/order.status';
import { OrderItem } from './order.item';

export class Order {
  private constructor(
    public readonly id: OrderId,
    public readonly number: OrderNumber,
    public readonly cpf: Cpf | null,
    public readonly items: OrderItem[],
    public readonly price: OrderPrice,
    public readonly orderStatus: OrderStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static new(
    id: OrderId,
    number: OrderNumber,
    cpf: Cpf | null,
    items: OrderItem[],
    orderStatus: OrderStatus,
    createdAt: Date,
    updatedAt: Date
  ): Result<Order> {
    const orderPrice = this.calculatePrice(items);

    return Result.success(
      new Order(
        id,
        number,
        cpf,
        items,
        orderPrice.get(),
        orderStatus,
        createdAt,
        updatedAt
      )
    );
  }

  private static calculatePrice(orderItems: OrderItem[]): Result<OrderPrice> {
    const orderPriceValue = orderItems.reduce(
      (sum, item) => sum + item.price.value,
      0
    );
    return OrderPrice.new(orderPriceValue);
  }

  updateStatus(orderStatus: OrderStatus): Order {
    const updatedAt = new Date();

    return new Order(
      this.id,
      this.number,
      this.cpf,
      this.items,
      this.price,
      orderStatus,
      this.createdAt,
      updatedAt
    );
  }
}
