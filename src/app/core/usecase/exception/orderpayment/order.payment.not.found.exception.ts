import { NotExistsException } from '../not.exists.exception';

export class OrderPaymentNotFoundException extends NotExistsException {
  static readonly TYPE = 'OrderPayment';

  constructor(message: string) {
    super(OrderPaymentNotFoundException.TYPE, message);
  }
}
