import { Result, success } from '@util/result';
import { ProductId } from './valueobject/product.id';
import { ProductCategory } from './valueobject/product.category';
import { ProductDescription } from './valueobject/product.description';
import { ProductName } from './valueobject/product.name';
import { ProductPrice } from './valueobject/product.price';

export class Product {
  private constructor(
    public readonly id: ProductId,
    public readonly name: ProductName,
    public readonly price: ProductPrice,
    public readonly category: ProductCategory,
    public readonly description: ProductDescription,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly disabled: boolean
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

  public static new(
    id: ProductId,
    name: ProductName,
    price: ProductPrice,
    category: ProductCategory,
    description: ProductDescription,
    createdAt: Date,
    updatedAt: Date,
    disabled: boolean
  ): Result<Product> {
    return success(
      new Product(
        id,
        name,
        price,
        category,
        description,
        createdAt,
        updatedAt,
        disabled
      )
    );
  }

  updateValues(
    name: ProductName,
    price: ProductPrice,
    category: ProductCategory,
    description: ProductDescription
  ) {
    const updatedAt = new Date();
    return new Product(
      this.id,
      name,
      price,
      category,
      description,
      this.createdAt,
      updatedAt,
      this.disabled
    );
  }

  toDisabled(): Product {
    const disabled = true;
    const updatedAt = new Date();
    return new Product(
      this.id,
      this.name,
      this.price,
      this.category,
      this.description,
      this.createdAt,
      updatedAt,
      disabled
    );
  }
}
