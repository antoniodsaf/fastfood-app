import { NotExistsException } from '../not.exists.exception';

export class ProductNotFoundException extends NotExistsException {
  static readonly TYPE = 'Product';

  constructor(message: string) {
    super(ProductNotFoundException.TYPE, message);
  }
}
