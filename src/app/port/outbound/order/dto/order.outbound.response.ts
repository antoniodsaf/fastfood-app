import { OrderItemOutboundResponse } from './order.item.outbound.response';

export class OrderOutboundResponse {
  constructor(
    readonly idValue: string,
    readonly numberValue: number,
    readonly cpfValue: string,
    readonly items: OrderItemOutboundResponse[],
    readonly priceValue: number,
    readonly orderStatusValue: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
