import { body, param } from "express-validator";

export const createSubCategoryBody = [
  body("name")
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage("Sub category name is required"),
  body("categoryUuid").isUUID(4).withMessage("Valid category uuid is required"),
];
export const updateSubCategoryBody = [
  body("name")
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage("Sub category name is required"),
  param("uuid").isUUID(4).withMessage("Valid sub category uuid is required"),
];
export const deleteSubCategoryBody = [
  param("uuid").isUUID(4).withMessage("Valid uuid is required"),
];
export const readSubCategoryBody = [
  body("limit").optional().isInt().withMessage("Limit must be valid integer"),
  body("page").optional().isInt().withMessage("Page must be valid integer"),
  body("relations")
    .optional()
    .isArray()
    .withMessage("Must be an array of string")
    .bail()
    .custom((arr: string[], { req }) => {
      const allowedValues = { category: true };
      const allowedValuesLen = Object.keys(allowedValues).length;
      const arrLen = arr.length;
      const errorMsg = "Relations can only have these values [`category`]";
      if (arrLen > allowedValuesLen) {
        throw new Error(errorMsg);
      }
      arr.forEach((val) => {
        if (!(val in allowedValues)) throw new Error(errorMsg);
      });
      // Indicates the success of this synchronous custom validator
      return true;
    }),
];
