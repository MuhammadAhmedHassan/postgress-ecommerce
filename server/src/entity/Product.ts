import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Category, Model, Rating, SubCategory } from ".";
import { createSlug } from "../utils/util-funcs";

export enum ShippingEnum {
  YES = "yes",
  NO = "no",
}

export enum ProductColor {
  BLACK = "black",
  BROWN = "brown",
  SILVER = "silver",
  WHITE = "white",
  BLUE = "blue",
}

export enum ProductBrand {
  APPLE = "apple",
  SAMSUNG = "samsung",
  MICROSOFT = "microsoft",
  LENOVO = "lenovo",
  ASUS = "asus",
}

export type ProductColorsType = "black" | "brown" | "silver" | "white" | "blue";

@Entity({ name: "products" })
export class Product extends Model {
  @Column()
  slug: string;

  @Column({ length: 256 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", scale: 2 })
  price: number;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @Column({ type: "int", default: 0 })
  sold: number;

  @Column({ type: "simple-array" })
  images: string[];

  @Column({
    type: "enum",
    enum: ShippingEnum,
    default: ShippingEnum.NO,
  })
  shipping: ShippingEnum;

  // @Column({
  //   type: "enum",
  //   enum: ProductColor,
  // })
  // color: ProductColor;
  @Column({ type: "simple-array" })
  colors: ProductColorsType[];

  @Column({
    type: "enum",
    enum: ProductBrand,
  })
  brand: ProductBrand;

  // Many products will have a single category
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  // Many products will have a single sub-category
  @ManyToOne(() => SubCategory, (subCat) => subCat.products)
  subCategory: SubCategory;

  // One product will have many ratings
  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];

  @BeforeUpdate()
  @BeforeInsert()
  formatFields() {
    const title = this.title.toLowerCase();
    this.slug = createSlug(title);
  }
}
