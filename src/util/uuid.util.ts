import { randomUUID } from 'crypto';

export class UUIDUtil {
  static isValid(uuid: string): boolean {
    const regexUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexUUID.test(uuid);
  }

  static generate(): string {
    return randomUUID().toString();
  }
}
