import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Category } from "../entity";

import { BadRequestError } from "../errors";
import { createSlug, findOneRecordCatch } from "../utils/util-funcs";

// CREATE CATEGORY
export const createCategory = async (req: Request, res: Response) => {
  const name = req.body.name.toLowerCase();
  const slug = createSlug(name);
  // IF category doesn't found, it will throw error,
  // otherwise we need to throw error
  const existingCategory = await Category.findOne({ slug }).catch(
    findOneRecordCatch
  );

  if (existingCategory) throw new BadRequestError("Category already exists");

  const category = Category.create({ name });
  await category.save();

  res.status(201).json({ category });
};

// READ CATEGORY
export const readCategories = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.body;
  const skip = limit * (page - 1);
  const categories = await Category.find({ skip, take: limit });
  res.json({ data: categories });
};

// UPDATE CATEGORY
export const updateCategory = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const name = req.body.name.toLowerCase();
  const slug = createSlug(name);
  // IF category doesn't found, it will throw error,
  // otherwise we need to throw error
  const existingCategory = await Category.findOne({ slug }).catch(
    findOneRecordCatch
  );

  if (existingCategory)
    throw new BadRequestError("Category with this name already exists");

  const categoryToUpdate: Category | null = await Category.findOne({
    uuid,
  }).catch(findOneRecordCatch);

  if (!categoryToUpdate) throw new BadRequestError("Category not found");

  categoryToUpdate.name = name;
  await categoryToUpdate.save();
  // HOW TO WIRTE RAW QUERY: getConnection().query(``, [])

  res.json({ category: categoryToUpdate });
};

// DELETE CATEGORY
export const deleteCategory = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  const categoryToDelete: Category | null = await Category.findOne({
    uuid,
  }).catch(findOneRecordCatch);

  if (!categoryToDelete) throw new BadRequestError("Category not found");

  await categoryToDelete.remove();

  res.sendStatus(204);
};
