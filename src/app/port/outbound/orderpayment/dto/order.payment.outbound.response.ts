export class OrderPaymentOutboundResponse {
  constructor(
    readonly id: string,
    readonly orderId: string,
    readonly orderPaymentStatus: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
