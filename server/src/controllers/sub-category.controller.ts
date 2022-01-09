import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { SubCategory, Category } from "../entity";

import { BadRequestError } from "../errors";
import { createSlug, findOneRecordCatch } from "../utils/util-funcs";

// CREATE SUB CATEGORY
export const createSubCategory = async (req: Request, res: Response) => {
  const name = req.body.name.toLowerCase();
  const categoryUuid = req.body.categoryUuid;
  const slug = createSlug(name);

  // Check if category exists
  const category: Category = await Category.findOne({
    uuid: categoryUuid,
  }).catch(findOneRecordCatch);

  if (!category) throw new BadRequestError("Category not found");

  // IF category doesn't found, it will throw error,
  // otherwise we need to throw error
  const existingSubCategory: SubCategory = await SubCategory.findOne(
    { slug, category },
    { relations: ["category"] }
  ).catch(findOneRecordCatch);

  // IF WE HAVE A SUB CATEGORY AND ITS CATEGORY IS SAME AS THE GIVEN ONE
  if (existingSubCategory)
    throw new BadRequestError(
      "Sub category within this category with this name already exists"
    );

  const subCategory = SubCategory.create({ name, category });
  await subCategory.save();

  res.status(201).json({ subCategory });
};

// READ SUB CATEGORY
export const readSubCategories = async (req: Request, res: Response) => {
  const { limit = 10, page = 1, relations = ["category"] } = req.body;
  const skip = limit * (page - 1);
  const categories = await SubCategory.find({ skip, take: limit, relations });
  res.json({ data: categories });
};

// UPDATE SUB CATEGORY
export const updateSubCategory = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const name = req.body.name.toLowerCase();
  const slug = createSlug(name);

  const subCategoryToUpdate: SubCategory = await SubCategory.findOne(
    {
      uuid,
    },
    { relations: ["category"] }
  ).catch(findOneRecordCatch);

  if (!subCategoryToUpdate) throw new BadRequestError("Sub category not found");

  // IF category doesn't found, it will throw error,
  // otherwise we need to throw error
  // If within the same category this slug exists, then throw error
  const existingSubCategory = await SubCategory.findOne({
    slug,
    category: subCategoryToUpdate.category,
  }).catch(findOneRecordCatch);

  if (existingSubCategory)
    throw new BadRequestError("Sub category with this name already exists");

  subCategoryToUpdate.name = name;
  await subCategoryToUpdate.save();
  // HOW TO WIRTE RAW QUERY: getConnection().query(``, [])

  res.json({ subCategory: subCategoryToUpdate });
};

// DELETE SUB CATEGORY
export const deleteSubCategory = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  const subCategoryToDelete: SubCategory = await Category.findOne({
    uuid,
  }).catch(findOneRecordCatch);

  if (!subCategoryToDelete) throw new BadRequestError("Sub category not found");

  await subCategoryToDelete.remove();

  res.sendStatus(204);
};
