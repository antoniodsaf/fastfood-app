import { CreateCustomerInboundRequest } from '@app/port/inbound/customer/dto/create.customer.inbound.request';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerRequest {
  @ApiProperty({
    example: '65183143463',
    description:
      'Utilize um gerador de cpf online free, como https://www.geradordecpf.org/ para testes.'
  })
  readonly cpf: string;
  @ApiProperty({
    example: 'Fulano de tal'
  })
  readonly name: string;
  @ApiProperty({
    example: 'fulanodetal@empresa.com.br'
  })
  readonly email: string;

  constructor(cpf: string, name: string, email: string) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
  }

  toInbound(): CreateCustomerInboundRequest {
    return new CreateCustomerInboundRequest(this.cpf, this.name, this.email);
  }
}
