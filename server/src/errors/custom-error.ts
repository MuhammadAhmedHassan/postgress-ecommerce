export abstract class CustomError extends Error {
  abstract statusCode: number; // abstract at the start means you must have this field
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): {
    message: any;
    field?: string;
  }[];
}
