export class OrderItemOutboundResponse {
  constructor(
    readonly idValue: string,
    readonly productNameValue: string,
    readonly productPriceValue: number,
    readonly quantityValue: number,
    readonly priceValue: number
  ) {}
}
