/*export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const success = <T> (resultData: T): Result<T> => {
    return { ok: true, value: resultData }
}

export const failure = <T> (exception: Error): Result<T> => {
    return { ok: false, error: exception }
}*/

export class Result<T> {
  constructor(
    private readonly ok: boolean,
    private readonly value?: T,
    private readonly error?: Error
  ) {}

  static success<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }

  static failure<T>(error: Error): Result<T> {
    return new Result<T>(false, undefined, error);
  }

  map<U>(func: (value: T) => U): Result<U> {
    if (this.ok && this.value !== undefined) {
      return Result.success(func(this.value));
    } else {
      return Result.failure<U>(this.error as Error);
    }
  }

  get(): T {
    return this.getOrThrow();
  }

  private getOrThrow(): T {
    if (this.value !== null && this.value !== undefined) {
      return this.value as T;
    }
    throw this.error;
  }
}

export const success = <T>(value: T): Result<T> => Result.success<T>(value);
export const failure = <T>(error: Error): Result<T> => Result.failure<T>(error);
