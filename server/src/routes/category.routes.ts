import { Router } from "express";
// middlewares
import {
  validateResult,
  currentUser,
  requireAuth,
  requireAdmin,
} from "../middlewares";
// Controllers
import {
  createCategory,
  deleteCategory,
  readCategories,
  updateCategory,
} from "../controllers/category.controller";
// Rules
import {
  createCategoryBody,
  deleteCategoryBody,
  updateCategoryBody,
} from "../request-validation-rules";

export const router = Router();

// TODO: Read by name, slug is remaining
router.get("/category", readCategories);

router.use(currentUser, requireAuth, requireAdmin);

// CREATE CATEGORY
router.post(
  "/category/create",
  createCategoryBody,
  validateResult,
  createCategory
);
// UPDATE CATEGORY
router.put(
  "/category/:uuid",
  updateCategoryBody,
  validateResult,
  updateCategory
);
// DELETE CATEGORY
router.delete(
  "/category/:uuid",
  deleteCategoryBody,
  validateResult,
  deleteCategory
);
