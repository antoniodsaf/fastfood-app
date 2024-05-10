import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { OrderPaymentOutboundResponse } from '@app/port/outbound/orderpayment/dto/order.payment.outbound.response';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'pagamentos_pedido' })
export class OrderPaymentEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  readonly id: string;

  @Column({ name: 'id_pedido', length: 50 })
  readonly orderId: string;

  @Column({ name: 'criado_em', type: 'timestamptz' })
  readonly createdAt: Date;

  @Column({ name: 'atualizado_em', type: 'timestamptz' })
  readonly updatedAt: Date;

  @Column({ name: 'status', length: 50 })
  readonly status: string;

  constructor(
    id: string,
    orderId: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.orderId = orderId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(orderPayment: OrderPayment) {
    return new OrderPaymentEntity(
      orderPayment.id.value,
      orderPayment.orderId.value,
      orderPayment.orderPaymentStatus,
      orderPayment.createdAt,
      orderPayment.updatedAt
    );
  }

  toOutbound() {
    return new OrderPaymentOutboundResponse(
      this.id,
      this.orderId,
      this.status,
      this.createdAt,
      this.updatedAt
    );
  }
}
