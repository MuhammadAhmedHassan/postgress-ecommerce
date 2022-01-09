import { body, param } from "express-validator";
import { ProductBrand, ProductColor, ShippingEnum } from "../entity";
import { StringkeyStringValueType } from "../types";

const emptyRule = (name: string, msg: string) =>
  body(name).not().isEmpty({ ignore_whitespace: false }).withMessage(msg);

const colorsCustomValidator = (value: string[]) => {
  // will output values like: { a: "a", b: "b", c: "c" }
  const colors = Object.values(ProductColor);
  const values = colors.reduce<StringkeyStringValueType>(
    (prv, cur) => ({ ...prv, [cur]: cur }),
    {}
  );
  if (!value.every((elem) => elem in values)) {
    throw new Error(`Colors can be these [${colors}] only.`);
  }
  return true;
};

export const createProductBody = [
  emptyRule("title", "Title is required"),
  emptyRule("description", "Description is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positve value"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than or equal to 0"),
  body("sold")
    .isInt({ min: 0 })
    .withMessage("Sold must be greater than or equal to 0"),
  body("images").isArray().withMessage("Images must be an array"),
  body("shipping")
    .isIn(Object.values(ShippingEnum))
    .withMessage(`Shipping can be one of these ${Object.values(ShippingEnum)}`),
  body("colors")
    .isArray()
    .withMessage(
      `Color can be one or more of these [${Object.values(ProductColor).join(
        ", "
      )}]`
    )
    .bail()
    .custom(colorsCustomValidator),
  body("brand")
    .isIn(Object.values(ProductBrand))
    .withMessage(`Brand can be one of these ${Object.values(ProductBrand)}`),
  body("categoryUuid").isUUID(4).withMessage("Valid category uuid is required"),
  body("subCategoryUuid")
    .isUUID(4)
    .withMessage("Valid category uuid is required"),
];

export const updateProductBody = [
  body("title")
    .optional()
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage("Title is required"),
  body("description")
    .optional()
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage("Description is required"),
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than or equal to 0"),
  body("sold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sold must be greater than or equal to 0"),
  body("images").optional().isArray().withMessage("Images must be an array"),
  body("shipping")
    .optional()
    .isIn(Object.values(ShippingEnum))
    .withMessage(`Shipping can be one of these ${Object.values(ShippingEnum)}`),
  body("colors")
    .optional()
    .isArray()
    .withMessage(
      `Color can be one or more of these [${Object.values(ProductColor).join(
        ", "
      )}]`
    )
    .bail()
    .custom(colorsCustomValidator),
  body("brand")
    .optional()
    .isIn(Object.values(ProductBrand))
    .withMessage(`Brand can be one of these ${Object.values(ProductBrand)}`),

  param("uuid").isUUID(4).withMessage("Valid uuid is required"),
];
export const deleteProductBody = [
  param("uuid").isUUID(4).withMessage("Valid uuid is required"),
];
