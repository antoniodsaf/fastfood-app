import { InternalServerErrorException } from '@nestjs/common';

export class InvalidDomainStateException extends InternalServerErrorException {
  constructor(
    public readonly type: string,
    message: string
  ) {
    super({ type, message });
  }
}
