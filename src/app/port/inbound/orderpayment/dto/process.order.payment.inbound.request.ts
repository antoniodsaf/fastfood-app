export class ProcessOrderPaymentInboundRequest {
  constructor(
    readonly orderId: string,
    readonly paid: boolean
  ) {}
}
