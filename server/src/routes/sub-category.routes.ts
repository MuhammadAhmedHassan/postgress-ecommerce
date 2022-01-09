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
  createSubCategory,
  deleteSubCategory,
  readSubCategories,
  updateSubCategory,
} from "../controllers/sub-category.controller";
// Rules
import {
  createSubCategoryBody,
  deleteSubCategoryBody,
  readSubCategoryBody,
  updateSubCategoryBody,
} from "../request-validation-rules";

export const router = Router();

// TODO: Read by name, slug is remaining
router.get(
  "/sub-category",
  readSubCategoryBody,
  validateResult,
  readSubCategories
);

router.use(currentUser, requireAuth, requireAdmin);

// CREATE CATEGORY
router.post(
  "/sub-category/create",
  createSubCategoryBody,
  validateResult,
  createSubCategory
);
// UPDATE CATEGORY
router.put(
  "/sub-category/:uuid",
  updateSubCategoryBody,
  validateResult,
  updateSubCategory
);
// DELETE CATEGORY
router.delete(
  "/sub-category/:uuid",
  deleteSubCategoryBody,
  validateResult,
  deleteSubCategory
);
