import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entity";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAdmin = (req: Request, _: Response, next: NextFunction) => {
  if (req.currentUser.role !== UserRole.ADMIN) {
    throw new NotAuthorizedError();
  }
  next();
};
