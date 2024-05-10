export class ResponseWrapper<T> {
  private status: number;
  private message: string;
  private data: T;

  static new<T>(): ResponseWrapper<T> {
    return new ResponseWrapper<T>();
  }

  statusCode(statusCode: number): ResponseWrapper<T> {
    this.status = statusCode;
    return this;
  }

  msg(message: string): ResponseWrapper<T> {
    this.message = message;
    return this;
  }

  body(data: T): ResponseWrapper<T> {
    this.data = data;
    return this;
  }

  getStatusCode(): number {
    return this.status;
  }

  getMessage(): string {
    return this.message;
  }

  getData(): T {
    return this.data;
  }
}
