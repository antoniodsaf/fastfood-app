import { Product } from '@app/core/domain/product/product';
import { ProductOutboundResponse } from '@app/port/outbound/product/dto/product.outbound.response';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { DecimalColumnTransformer } from '../decimal.column.transformer';

@Entity({ name: 'produtos' })
export class ProductEntity {
  constructor(
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

  @PrimaryColumn({ type: 'varchar', length: 50 })
  readonly id: string;

  @Column({ name: 'nome', length: 255 })
  readonly name: string;

  @Column({
    name: 'preco',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer()
  })
  readonly price: number;

  @Column({ name: 'categoria', length: 255 })
  readonly category: string;

  @Column({ name: 'descricao', length: 255 })
  readonly description: string;

  @Column({ name: 'criado_em', type: 'timestamptz' })
  readonly createdAt: Date;

  @Column({ name: 'atualizado_em', type: 'timestamptz' })
  readonly updatedAt: Date;

  @Column({ name: 'desativado', type: 'boolean', default: false })
  readonly disabled: boolean;

  static from(product: Product): ProductEntity {
    return new ProductEntity(
      product.id.value,
      product.name.value,
      product.price.value,
      product.category,
      product.description.value,
      product.createdAt,
      product.updatedAt,
      product.disabled
    );
  }

  toOutbound(): ProductOutboundResponse {
    return new ProductOutboundResponse(
      this.id,
      this.name,
      this.price,
      this.category,
      this.description,
      this.createdAt,
      this.updatedAt,
      this.disabled
    );
  }
}
