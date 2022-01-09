import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401; // 401 not authorized
  reason = "Not authorized";

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
