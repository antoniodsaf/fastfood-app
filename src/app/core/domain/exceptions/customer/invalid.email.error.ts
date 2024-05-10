import { InvalidValueError } from '../invalid.value.error';

export class InvalidEmailError extends InvalidValueError {
  private static readonly TYPE = 'Email';

  constructor(message: string) {
    super(InvalidEmailError.TYPE, message);
  }
}
