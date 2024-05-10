import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/app/core/domain/product/product';

export class ProductResponse {
  @ApiProperty({
    example: '3e74c924-89a8-412a-8a41-c5dec1878f03'
  })
  readonly id: string;
  @ApiProperty({
    example: 'Hamburger'
  })
  readonly name: string;
  @ApiProperty({
    example: 10.99
  })
  readonly price: number;
  @ApiProperty({
    example: 'SNACK',
    enum: ['SNACK', 'DRINK', 'DESSERT', 'SIDE_DISH']
  })
  readonly category: string;
  @ApiProperty({
    example: 'Pão artesanal, queijo e hamburger artesanal'
  })
  readonly description: string;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
  @ApiProperty()
  readonly disabled: boolean;

  private constructor(
    id: string,
    name: string,
    price: number,
    category: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    disabled: boolean
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.disabled = disabled;
  }

  public static from(product: Product): ProductResponse {
    return new ProductResponse(
      product.id.value,
      product.name.value,
      product.price.value,
      product.category.toString(),
      product.description.value,
      product.createdAt,
      product.updatedAt,
      product.disabled
    );
  }
}
