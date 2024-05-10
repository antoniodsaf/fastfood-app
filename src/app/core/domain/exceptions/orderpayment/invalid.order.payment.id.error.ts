import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderPaymentIdError extends InvalidValueError {
  private static readonly TYPE = 'OrderPaymentId';

  constructor(message: string) {
    super(InvalidOrderPaymentIdError.TYPE, message);
  }
}
