import { Request, Response } from "express";

import { User, UserRole } from "../entity";
import { BadRequestError } from "../errors";
import { Password } from "../utils/Password";
import {
  findOneRecordCatch,
  generateJwtAndSetCookie,
} from "../utils/util-funcs";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  // IF user doesn't found, it will throw error,
  // otherwise we need to throw error
  const existingUser = await User.findOne({ email }).catch(findOneRecordCatch);

  if (existingUser) throw new BadRequestError("Email in use");

  const user = User.create({
    email,
    password,
    name: email,
    role: role ? role : UserRole.SUBSCRIBER,
    cart: [],
  });
  await user.save();

  generateJwtAndSetCookie(req, user);

  res.status(201).json({ user });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // IF user doesn't found, it will throw error,
  const user = await User.findOne({ email }).catch(findOneRecordCatch);

  const passwordMatch = await Password.compare(user.password, password);
  if (!passwordMatch) throw new BadRequestError("Invalid credentials");

  generateJwtAndSetCookie(req, user);

  res.json({ user });
};

export const logoutUser = async (req: Request, res: Response) => {
  req.session = null;
  res.json({});
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
};
