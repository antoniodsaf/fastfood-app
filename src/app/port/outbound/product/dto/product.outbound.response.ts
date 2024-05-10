export class ProductOutboundResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly category: string,
    readonly description: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly disabled: boolean
  ) {}
}
