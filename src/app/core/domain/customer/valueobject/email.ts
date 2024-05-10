import { Result, failure, success } from '@util/result';
import { InvalidEmailError } from '../../exceptions/customer/invalid.email.error';

export class Email {
  private static readonly MAX_LENGTH = 255;
  private static readonly EMAIL_ADDRESS_PATTERN = new RegExp(
    '[a-zA-Z0-9+._%\\-]{1,256}' +
      '@' +
      '[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}' +
      '(' +
      '\\.' +
      '[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}' +
      ')+'
  );

  private constructor(public readonly value: string) {}

  public static new(value: string): Result<Email> {
    return success(new Email(this.validate(value).get()));
  }

  private static validate(value: string): Result<string> {
    if (!value) {
      return failure(new InvalidEmailError('empty email.'));
    }
    if (value.length > this.MAX_LENGTH) {
      return failure(
        new InvalidEmailError(`email cannot be bigger than ${this.MAX_LENGTH}.`)
      );
    }
    if (!this.EMAIL_ADDRESS_PATTERN.test(value)) {
      return failure(new InvalidEmailError('invalid email.'));
    }
    return success(value);
  }
}
