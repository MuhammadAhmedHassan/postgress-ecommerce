import { body, param } from "express-validator";

export const createCategoryBody = [
  body("name")
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage("Category name is required"),
];
export const updateCategoryBody = [
  ...createCategoryBody,
  param("uuid").isUUID(4).withMessage("Valid uuid is required"),
];
export const deleteCategoryBody = [
  param("uuid").isUUID(4).withMessage("Valid uuid is required"),
];
