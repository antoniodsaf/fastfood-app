import { CreateOrderItemInboundRequest } from './create.order.item.inbound.request';

export class CreateOrderInboundRequest {
  constructor(
    readonly cpf: string,
    readonly items: CreateOrderItemInboundRequest[]
  ) {}
}
