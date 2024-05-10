import { InvalidValueError } from '../invalid.value.error';

export class InvalidCpfError extends InvalidValueError {
  static readonly TYPE = 'CPF';

  constructor(message: string) {
    super(InvalidCpfError.TYPE, message);
  }
}
