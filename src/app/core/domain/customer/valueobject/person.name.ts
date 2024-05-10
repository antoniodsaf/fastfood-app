import { Result } from '@util/result';
import { InvalidPersonNameError } from '../../exceptions/customer/invalid.person.name.error';

export class PersonName {
  private constructor(public readonly value: string) {}

  static readonly MAX_LENGTH = 255;

  static new(value: string): Result<PersonName> {
    return this.validate(value).map((v) => new PersonName(v));
  }

  private static validate(value: string): Result<string> {
    if (!value || value.length === 0) {
      return Result.failure(new InvalidPersonNameError('empty person name.'));
    }
    if (value.length > PersonName.MAX_LENGTH) {
      return Result.failure(
        new InvalidPersonNameError(
          `person name cannot be bigger than ${PersonName.MAX_LENGTH}.`
        )
      );
    }
    if (value !== value.trim()) {
      return Result.failure(
        new InvalidPersonNameError(
          'person name cannot start or end with whitespace.'
        )
      );
    }

    return Result.success(value);
  }
}
