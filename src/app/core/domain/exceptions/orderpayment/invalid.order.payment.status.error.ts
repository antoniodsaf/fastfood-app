import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderPaymentStatusError extends InvalidValueError {
  private static readonly TYPE = 'OrderPaymentStatus';

  constructor(message: string) {
    super(InvalidOrderPaymentStatusError.TYPE, message);
  }
}
