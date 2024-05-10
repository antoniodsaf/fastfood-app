import { InvalidDomainStateException } from '../invalid.domain.state.exception';

export class InvalidOrderPaymentStateException extends InvalidDomainStateException {
  static readonly TYPE = 'OrderPayment';

  constructor(message: string) {
    super(InvalidOrderPaymentStateException.TYPE, message);
  }
}
