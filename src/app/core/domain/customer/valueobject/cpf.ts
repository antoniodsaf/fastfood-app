import { Result, failure, success } from '@util/result';
import { InvalidCpfError } from '../../exceptions/customer/invalid.cpf.error';

interface InvalidCpfException extends Error {
  message: string;
}

export class Cpf {
  private constructor(public readonly value: string) {
    this.value = value;
  }

  static new(value: string): Result<Cpf> {
    return this.validated(value).map((validValue) => new Cpf(validValue));
  }

  private static validated(value: string): Result<string> {
    if (!value) {
      return failure(new InvalidCpfError('need to inform a cpf value.'));
    }
    if (!this.hasValidLength(value)) {
      return failure(new InvalidCpfError(`must have '${this.LENGTH}' length.`));
    }
    if (!this.hasOnlyDigits(value)) {
      return failure(new InvalidCpfError('must have only digits.'));
    }
    if (this.isOnBlacklist(value)) {
      return failure(new InvalidCpfError('blacklist cpf.'));
    }
    if (!this.isValid(value)) {
      return failure(new InvalidCpfError('invalid cpf.'));
    }

    return success(value);
  }

  private static readonly LENGTH = 11;

  private static hasValidLength(value: string): boolean {
    return value && this.LENGTH === value.length;
  }

  private static hasOnlyDigits(value: string): boolean {
    return value.split('').every((char) => /\d/.test(char));
  }

  private static isOnBlacklist(value: string): boolean {
    const firstDigit = value[0];
    return value.split('').every((char) => char === firstDigit);
  }

  private static isValid(cpf: string) {
    const cleanedCPF = cpf.replace(/\D+/g, '');
    if (cleanedCPF.length !== Cpf.LENGTH || /(\d)\1{10}/.test(cleanedCPF)) {
      return false;
    }

    const cpfDigits = cleanedCPF.split('').map(Number);
    const rest = (count) => {
      const sum = cpfDigits.slice(0, count - 12).reduce((acc, el, index) => {
        return acc + el * (count - index);
      }, 0);
      return ((sum * 10) % 11) % 10;
    };

    const j = rest(10);
    const k = rest(11);

    if (j !== cpfDigits[9] || k !== cpfDigits[10]) {
      return false;
    }

    return true;
  }
}
