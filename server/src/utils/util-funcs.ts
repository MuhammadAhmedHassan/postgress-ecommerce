import { Request } from "express";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import { User } from "../entity";
import { EntityNotFoundError } from "typeorm";

export const generateJwtAndSetCookie = (req: Request, user: User) => {
  const userJwt = jwt.sign(
    {
      uuid: user.uuid,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY!
  );
  // Store it on session object
  req.session = { jwt: userJwt };
};

export const createSlug = (name: string) => {
  return slugify(name.toLowerCase(), { lower: true, replacement: "-" });
};

export const findOneRecordCatch = (error: any) => {
  if (error instanceof EntityNotFoundError) return null; // findOneOrFail throws it
  if (error?.code === "42703") return null; // I think 42703 is not found code
  // throw new DatabaseError("Something went wrong."); // class to create
  throw error; // for other type of errors
};
