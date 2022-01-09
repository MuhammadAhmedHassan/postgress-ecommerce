import { body } from "express-validator";
import { UserRole } from "../entity";

export const registerUserBody = [
  body("name").optional(),
  body("email").isEmail().withMessage("Email must be valid"),
  body("role")
    .optional()
    .isIn([UserRole.ADMIN, UserRole.USER, UserRole.SUBSCRIBER])
    .withMessage("role can be one of admin, user or subscriber"),
  body("password")
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

export const loginUserBody = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage("Password must not be empty"),
];
