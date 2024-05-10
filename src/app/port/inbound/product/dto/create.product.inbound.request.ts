export class CreateProductInboundRequest {
  constructor(
    readonly name: string,
    readonly price: number,
    readonly category: string,
    readonly description: string
  ) {}
}
