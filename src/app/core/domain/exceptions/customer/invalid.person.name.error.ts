import { InvalidValueError } from '../invalid.value.error';

export class InvalidPersonNameError extends InvalidValueError {
  private static readonly TYPE = 'PersonName';

  constructor(message: string) {
    super(InvalidPersonNameError.TYPE, message);
  }
}
