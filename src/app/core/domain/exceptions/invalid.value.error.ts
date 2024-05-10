import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidValueError extends HttpException {
  constructor(
    public type: string,
    message: string
  ) {
    super({ type, message }, HttpStatus.BAD_REQUEST);
  }
}
