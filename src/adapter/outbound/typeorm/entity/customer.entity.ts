import { Customer } from 'src/app/core/domain/customer/customer';
import { CustomerOutboundResponse } from 'src/app/port/outbound/customer/dto/customer.outbound.response';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class CustomerEntity {
  constructor(
    cpf: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    disabled: boolean
  ) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.disabled = disabled;
  }

  @PrimaryColumn({ type: 'varchar', length: 11 })
  readonly cpf: string;

  @Column({ name: 'nome' })
  readonly name: string;

  @Column({ name: 'email' })
  readonly email: string;

  @Column({ name: 'criado_em', type: 'timestamptz' })
  readonly createdAt: Date;

  @Column({ name: 'atualizado_em', type: 'timestamptz' })
  readonly updatedAt: Date;

  @Column({ name: 'desativado', type: 'boolean', default: false })
  readonly disabled: boolean;

  static from(customer: Customer): CustomerEntity {
    return new CustomerEntity(
      customer.cpf.value,
      customer.name.value,
      customer.email.value,
      customer.createdAt,
      customer.updatedAt,
      customer.disabled
    );
  }

  toOutbound(): CustomerOutboundResponse {
    return new CustomerOutboundResponse(
      this.cpf,
      this.name,
      this.email,
      this.createdAt,
      this.updatedAt,
      this.disabled
    );
  }
}
