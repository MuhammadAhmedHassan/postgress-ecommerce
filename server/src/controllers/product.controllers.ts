import { Request, Response } from "express";
import { Category, Product, SubCategory } from "../entity";

import { BadRequestError } from "../errors";
import { findOneRecordCatch } from "../utils/util-funcs";

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  const { categoryUuid, subCategoryUuid } = req.body;

  // FIND CATEGORY
  const category = await Category.findOneOrFail({ uuid: categoryUuid }).catch(
    findOneRecordCatch
  );
  if (!category) throw new BadRequestError("Category not found");

  // FIND SUB CATEGORY WITH THE CATEGORY ID
  const subCategory = await SubCategory.findOneOrFail({
    uuid: subCategoryUuid,
    category,
  }).catch(findOneRecordCatch);
  if (!subCategory) throw new BadRequestError("Sub Category not found");

  // You can create same products
  const product = Product.create({
    ...(req.body as Product),
    category,
    subCategory,
  });

  await product.save();

  res.status(201).json({ product });
};

// READ PRODUCTS
export const readProducts = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.body;
  const skip = limit * (page - 1);
  const products = await Product.find({ skip, take: limit });
  res.json({ data: products });
};

// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const existingProduct: Product = await Product.findOneOrFail({ uuid }).catch(
    findOneRecordCatch
  );
  if (!existingProduct) throw new BadRequestError("Product not found");

  for (let key in existingProduct.toJSON()) {
    if (key in req.body) {
      existingProduct[key] = req.body[key];
    }
  }

  await existingProduct.save();
  // HOW TO WIRTE RAW QUERY: getConnection().query(``, [])

  res.json({ product: existingProduct });
};

// DELETE Product
export const deleteProduct = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const product: Product = await Product.findOneOrFail({
    uuid,
  }).catch(findOneRecordCatch);

  if (!product) throw new BadRequestError("Product not found");
  await product.remove();
  res.sendStatus(204);
};
