import { Cpf } from "@app/core/domain/customer/valueobject/cpf";
import { Order } from "@app/core/domain/order/order";
import { OrderItem } from "@app/core/domain/order/order.item";
import { OrderId } from "@app/core/domain/order/valueobject/order.id";
import { OrderItemId } from "@app/core/domain/order/valueobject/order.item.id";
import { OrderItemQuantity } from "@app/core/domain/order/valueobject/order.item.quantity";
import { OrderNumber } from "@app/core/domain/order/valueobject/order.number";
import { OrderStatus } from "@app/core/domain/order/valueobject/order.status";
import { Product } from "@app/core/domain/product/product";
import { ProductName } from "@app/core/domain/product/valueobject/product.name";
import { ProductPrice } from "@app/core/domain/product/valueobject/product.price";
import { OrderItemOutboundResponse } from "@app/port/outbound/order/dto/order.item.outbound.response";
import { OrderOutboundResponse } from "@app/port/outbound/order/dto/order.outbound.response";
import { Result } from "@util/result";
import { OrderDomainMapper } from "./order.domain.mapper";

export class DefaultOrderDomainMapper implements OrderDomainMapper {
  instance(
    id: OrderId,
    orderNumber: OrderNumber,
    items: OrderItem[],
    orderStatus: OrderStatus,
    createdAt: Date,
    updatedAt: Date,
    nullableCpf?: Cpf
  ) {
    return Order.new(
      id,
      orderNumber,
      nullableCpf,
      items,
      orderStatus,
      new Date(),
      new Date()
    );
  }

  instanceItem(
    id: OrderItemId,
    product: Product,
    quantity: OrderItemQuantity
  ): Result<OrderItem> {
    return OrderItem.new(id, product.name, product.price, quantity);
  }

  instanceOutbound(
    orderOutboundResponse: OrderOutboundResponse
  ): Result<Order> {
    const id = OrderId.new(orderOutboundResponse.idValue).get();
    const number = OrderNumber.new(orderOutboundResponse.numberValue).get();
    const cpf = Cpf.new(orderOutboundResponse.cpfValue).get();
    const items = orderOutboundResponse.items.map((item) =>
      this.instanceItemOutbound(item).get()
    );
    const status = OrderStatus.findByValue(
      orderOutboundResponse.orderStatusValue
    ).get();

    return Order.new(
      id,
      number,
      cpf,
      items,
      status,
      orderOutboundResponse.createdAt,
      orderOutboundResponse.updatedAt
    );
  }

  instanceItemOutbound(
    orderItemOutboundResponse: OrderItemOutboundResponse
  ): Result<OrderItem> {
    const id = OrderItemId.new(orderItemOutboundResponse.idValue);
    const productName = ProductName.new(
      orderItemOutboundResponse.productNameValue
    );
    const productPrice = ProductPrice.new(
      orderItemOutboundResponse.productPriceValue
    );
    const quantity = OrderItemQuantity.new(
      orderItemOutboundResponse.quantityValue
    );

    return OrderItem.new(
      id.get(),
      productName.get(),
      productPrice.get(),
      quantity.get()
    );
  }
}
