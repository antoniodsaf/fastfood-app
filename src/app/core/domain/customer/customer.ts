import { Result, success } from '@util/result';
import { Cpf } from './valueobject/cpf';
import { Email } from './valueobject/email';
import { PersonName } from './valueobject/person.name';

export class Customer {
  readonly cpf: Cpf;
  readonly name: PersonName;
  readonly email: Email;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly disabled: boolean;

  private constructor(
    cpf: Cpf,
    name: PersonName,
    email: Email,
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

  public static new(
    cpf: Cpf,
    name: PersonName,
    email: Email,
    createdAt: Date,
    updatedAt: Date,
    disabled: boolean
  ): Result<Customer> {
    return success(
      new Customer(cpf, name, email, createdAt, updatedAt, disabled)
    );
  }
}
