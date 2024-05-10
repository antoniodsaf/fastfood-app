import { AlreadyExistsException } from '../already.exists.exception';

export class CustomerAlreadyExistsException extends AlreadyExistsException {
  static readonly TYPE = 'Customer';

  constructor(message: string) {
    super(CustomerAlreadyExistsException.TYPE, message);
  }
}
