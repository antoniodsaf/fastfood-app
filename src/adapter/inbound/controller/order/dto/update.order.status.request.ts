import { UpdateOrderStatusInboundRequest } from '@app/port/inbound/order/dto/update.order.status.inbound.request';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusRequest {
  @ApiProperty({
    example: 'PREPARING',
    enum: ['RECEIVED', 'PREPARING', 'READY', 'FINISHED']
  })
  status: string;

  toInbound(): UpdateOrderStatusInboundRequest {
    return new UpdateOrderStatusInboundRequest(this.status);
  }
}
