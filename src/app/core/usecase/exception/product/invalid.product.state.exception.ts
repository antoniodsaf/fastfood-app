import { InvalidDomainStateException } from '../invalid.domain.state.exception';

export class InvalidProductStateException extends InvalidDomainStateException {
  static readonly TYPE = 'Product';

  constructor(message: string) {
    super(InvalidProductStateException.TYPE, message);
  }
}
