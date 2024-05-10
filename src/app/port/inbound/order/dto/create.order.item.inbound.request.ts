export class CreateOrderItemInboundRequest {
  constructor(
    readonly productId: string,
    readonly quantity: number
  ) {}
}
