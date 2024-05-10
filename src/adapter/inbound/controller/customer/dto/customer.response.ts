import { ApiProperty } from '@nestjs/swagger';
import { Customer } from 'src/app/core/domain/customer/customer';

export class CustomerResponse {
  private constructor(
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

  @ApiProperty({
    example: '65183143463'
  })
  readonly cpf: string;
  @ApiProperty({
    example: 'Ciclano de tal'
  })
  readonly name: string;
  @ApiProperty({
    example: 'ciclano@empresa.com.br'
  })
  readonly email: string;
  @ApiProperty({
    example: false
  })
  readonly disabled: boolean;
  @ApiProperty({
    example: '2024-05-07T21:30:44.271Z'
  })
  readonly createdAt: Date;
  @ApiProperty({
    example: '2024-05-07T21:30:44.271Z'
  })
  readonly updatedAt: Date;

  public static from(customer: Customer): CustomerResponse {
    return new CustomerResponse(
      customer.cpf.value,
      customer.name.value,
      customer.email.value,
      customer.createdAt,
      customer.updatedAt,
      customer.disabled
    );
  }
}
