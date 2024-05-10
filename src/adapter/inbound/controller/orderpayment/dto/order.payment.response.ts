import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { ApiProperty } from '@nestjs/swagger';

export class OrderPaymentResponse {
  @ApiProperty({ example: '6e231dc9-2d1c-4fd1-bacb-717d8913172d' })
  readonly id: string;
  @ApiProperty({ example: '3e74c924-89a8-412a-8a41-c5dec1878f03' })
  readonly orderId: string;
  @ApiProperty({ example: 'WAITING', enum: ['ACCEPTED', 'REFUSED', 'WAITING'] })
  readonly orderPaymentStatus: string;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;

  constructor(
    id: string,
    orderId: string,
    orderPaymentStatus: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.orderId = orderId;
    this.orderPaymentStatus = orderPaymentStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(orderPayment: OrderPayment): OrderPaymentResponse {
    return new OrderPaymentResponse(
      orderPayment.id.value,
      orderPayment.orderId.value,
      orderPayment.orderPaymentStatus.toString(),
      orderPayment.createdAt,
      orderPayment.updatedAt
    );
  }
}
