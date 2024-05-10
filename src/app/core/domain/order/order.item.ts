import { Result } from '@util/result';
import { ProductName } from '../product/valueobject/product.name';
import { ProductPrice } from '../product/valueobject/product.price';
import { OrderItemPrice } from './valueobject/order.item.price';
import { OrderItemQuantity } from './valueobject/order.item.quantity';
import { OrderItemId } from './valueobject/order.item.id';

export class OrderItem {
  private constructor(
    readonly id: OrderItemId,
    readonly productName: ProductName,
    readonly productPrice: ProductPrice,
    readonly quantity: OrderItemQuantity,
    readonly price: OrderItemPrice
  ) {}

  static new(
    id: OrderItemId,
    productName: ProductName,
    productPrice: ProductPrice,
    quantity: OrderItemQuantity
  ): Result<OrderItem> {
    const price = this.calculatePrice(productPrice, quantity);
    return Result.success(
      new OrderItem(id, productName, productPrice, quantity, price.get())
    );
  }

  private static calculatePrice(
    productPrice: ProductPrice,
    quantity: OrderItemQuantity
  ): Result<OrderItemPrice> {
    const priceValue = productPrice.value * quantity.value;
    return OrderItemPrice.new(priceValue);
  }
}
