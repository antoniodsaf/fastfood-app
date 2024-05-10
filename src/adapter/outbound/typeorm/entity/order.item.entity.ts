import { OrderItem } from '@app/core/domain/order/order.item';
import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { PrimaryColumn, Column, Entity } from 'typeorm';
import { DecimalColumnTransformer } from '../decimal.column.transformer';
import { OrderItemOutboundResponse } from '@app/port/outbound/order/dto/order.item.outbound.response';
import { IntColumnTransformer } from '../int.column.transformer';

@Entity({ name: 'items_pedido' })
export class OrderItemEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  readonly id: string;

  @Column({ name: 'id_pedido', length: 50 })
  readonly orderId: string;

  @Column({ name: 'nome_produto', length: 255 })
  readonly productName: string;

  @Column({
    name: 'preco_produto',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer()
  })
  readonly productPrice: number;

  @Column({
    name: 'preco',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer()
  })
  readonly price: number;

  @Column({
    name: 'quantidade',
    type: 'bigint',
    transformer: new IntColumnTransformer()
  })
  readonly quantity: number;

  constructor(
    id: string,
    orderId: string,
    productName: string,
    productPrice: number,
    quantity: number,
    price: number
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.quantity = quantity;
    this.price = price;
  }

  static from(orderId: OrderId, orderItem: OrderItem): OrderItemEntity {
    return new OrderItemEntity(
      orderItem.id.value,
      orderId.value,
      orderItem.productName.value,
      orderItem.productPrice.value,
      orderItem.quantity.value,
      orderItem.price.value
    );
  }

  toOutbound(): OrderItemOutboundResponse {
    return new OrderItemOutboundResponse(
      this.id,
      this.productName,
      this.productPrice,
      this.quantity,
      this.price
    );
  }
}
