import { NotExistsException } from '../not.exists.exception';

export class OrderNotFoundException extends NotExistsException {
  static readonly TYPE = 'Order';

  constructor(message: string) {
    super(OrderNotFoundException.TYPE, message);
  }
}
