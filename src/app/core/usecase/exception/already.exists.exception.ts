import { ConflictException } from '@nestjs/common';

export class AlreadyExistsException extends ConflictException {
  constructor(
    public readonly type: string,
    message: string
  ) {
    super({ type, message });
  }
}
