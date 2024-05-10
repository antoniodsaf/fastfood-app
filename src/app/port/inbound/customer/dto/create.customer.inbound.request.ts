export class CreateCustomerInboundRequest {
  readonly cpf: string;
  readonly name: string;
  readonly email: string;

  constructor(cpf: string, name: string, email: string) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
  }
}
