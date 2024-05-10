import { AlreadyExistsException } from '../already.exists.exception';

export class OrderAlreadyExistsException extends AlreadyExistsException {
  static readonly TYPE = 'Order';

  constructor(message: string) {
    super(OrderAlreadyExistsException.TYPE, message);
  }
}
