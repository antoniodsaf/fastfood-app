export class CustomerOutboundResponse {
  readonly cpf: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly disabled: boolean;

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
}
