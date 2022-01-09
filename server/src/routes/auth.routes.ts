import { Router } from "express";
// middlewares
import { validateResult, currentUser } from "../middlewares";
// Controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/auth.controller";
// Rules
import { registerUserBody, loginUserBody } from "../request-validation-rules";

export const router = Router();

router.post("/auth/register", registerUserBody, validateResult, registerUser);
router.post("/auth/login", loginUserBody, validateResult, loginUser);
router.post("/auth/logout", logoutUser);
router.get("/auth/current-user", currentUser, getCurrentUser);
