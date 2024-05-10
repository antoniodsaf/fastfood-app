import { NotExistsException } from '../not.exists.exception';

export class CustomerNotFoundException extends NotExistsException {
  static readonly TYPE = 'Customer';

  constructor(message: string) {
    super(CustomerNotFoundException.TYPE, message);
  }
}
