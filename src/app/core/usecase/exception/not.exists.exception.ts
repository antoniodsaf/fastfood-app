import { NotFoundException } from '@nestjs/common';

export class NotExistsException extends NotFoundException {
  constructor(
    public readonly type: string,
    message: string
  ) {
    super({ type, message });
  }
}
