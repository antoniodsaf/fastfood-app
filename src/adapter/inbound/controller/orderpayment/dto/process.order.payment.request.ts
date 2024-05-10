import { ProcessOrderPaymentInboundRequest } from '@app/port/inbound/orderpayment/dto/process.order.payment.inbound.request';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessOrderPaymentRequest {
  @ApiProperty({
    example: '3e74c924-89a8-412a-8a41-c5dec1878f03'
  })
  orderId: string;
  @ApiProperty()
  paid: boolean;

  toInbound(): ProcessOrderPaymentInboundRequest {
    return new ProcessOrderPaymentInboundRequest(this.orderId, this.paid);
  }
}
