import { InvalidValueError } from '../invalid.value.error';

export class InvalidOrderPaymentStatusChangedError extends InvalidValueError {
  private static readonly TYPE = 'OrderPaymentStatusChanged';

  constructor(message: string) {
    super(InvalidOrderPaymentStatusChangedError.TYPE, message);
  }
}
