import { InvalidDomainStateException } from '../invalid.domain.state.exception';

export class InvalidOrderStateException extends InvalidDomainStateException {
  static readonly TYPE = 'Order';

  constructor(message: string) {
    super(InvalidOrderStateException.TYPE, message);
  }
}
