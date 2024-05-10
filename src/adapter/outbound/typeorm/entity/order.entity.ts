import { Order } from '@app/core/domain/order/order';
import { PrimaryColumn, Column, Entity } from 'typeorm';
import { DecimalColumnTransformer } from '../decimal.column.transformer';
import { OrderItemEntity } from './order.item.entity';
import { OrderOutboundResponse } from '@app/port/outbound/order/dto/order.outbound.response';
import { IntColumnTransformer } from '../int.column.transformer';

@Entity({ name: 'pedidos' })
export class OrderEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  readonly id: string;

  @Column({
    name: 'numero',
    type: 'bigint',
    transformer: new IntColumnTransformer()
  })
  readonly number: number;

  @Column({
    name: 'preco',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer()
  })
  readonly price: number;

  @Column({ name: 'cpf', length: 11 })
  readonly cpf: string;

  @Column({ name: 'criado_em', type: 'timestamptz' })
  readonly createdAt: Date;

  @Column({ name: 'atualizado_em', type: 'timestamptz' })
  readonly updatedAt: Date;

  @Column({ name: 'status', length: 50 })
  readonly status: string;

  constructor(
    id: string,
    number: number,
    cpf: string,
    price: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.number = number;
    this.cpf = cpf;
    this.price = price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(order: Order) {
    return new OrderEntity(
      order.id.value,
      order.number.value,
      order.cpf?.value,
      order.price.value,
      order.orderStatus.toString(),
      order.createdAt,
      order.updatedAt
    );
  }

  toOutbound(orderItemsEntity: OrderItemEntity[]): OrderOutboundResponse {
    const items = orderItemsEntity.map((item) => item.toOutbound());
    return new OrderOutboundResponse(
      this.id,
      this.number,
      this.cpf,
      items,
      this.price,
      this.status,
      this.createdAt,
      this.updatedAt
    );
  }
}
