export class UpdateProductInboundRequest {
  constructor(
    readonly name: string,
    readonly price: number,
    readonly category: string,
    readonly description: string
  ) {}
}
