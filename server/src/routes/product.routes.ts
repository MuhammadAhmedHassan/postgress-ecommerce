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
  createProduct,
  deleteProduct,
  readProducts,
  updateProduct,
} from "../controllers/product.controllers";
// Rules
import {
  createProductBody,
  deleteProductBody,
  updateProductBody,
} from "../request-validation-rules";

export const router = Router();

// TODO: Read by name, slug is remaining
router.get("/category", readProducts);

router.use(currentUser, requireAuth, requireAdmin);

// CREATE PRODUCT
router.post(
  "/product/create",
  createProductBody,
  validateResult,
  createProduct
);
// UPDATE PRODUCT
router.put("/product/:uuid", updateProductBody, validateResult, updateProduct);
// TODO: PATCH PRODUCT (append to colors, images, title, description and these type of fields)
// router.patch("/product/:uuid", )

// DELETE CATEGORY
router.delete(
  "/product/:uuid",
  deleteProductBody,
  validateResult,
  deleteProduct
);
