import { ApiProperty } from '@nestjs/swagger';
import { CreateProductInboundRequest } from 'src/app/port/inbound/product/dto/create.product.inbound.request';

export class CreateProductRequest {
  @ApiProperty({
    example: 'Hamburger'
  })
  readonly name: string;
  @ApiProperty({
    example: 'Pão artesanal, queijo e hamburger artesanal'
  })
  readonly description: string;
  @ApiProperty({
    example: 10.99
  })
  readonly price: number;
  @ApiProperty({
    example: 'SNACK',
    enum: ['SNACK', 'DRINK', 'DESSERT', 'SIDE_DISH']
  })
  readonly category: string;

  constructor(
    name: string,
    description: string,
    price: number,
    category: string
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
  }

  public toInbound = (): CreateProductInboundRequest => {
    return new CreateProductInboundRequest(
      this.name,
      this.price,
      this.category,
      this.description
    );
  };
}
