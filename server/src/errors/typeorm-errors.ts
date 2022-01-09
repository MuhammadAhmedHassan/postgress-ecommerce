import { CustomError } from "./custom-error";

export class TypeormErrors extends CustomError {
  statusCode = 400;

  constructor(private error: any, public message: string) {
    super(message);
    Object.setPrototypeOf(this, TypeormErrors.prototype);

    if (error.code === '42703') {
      // record not found
    }
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
