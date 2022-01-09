import {
  Entity,
  Column,
  BeforeInsert,
  Index,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category, Product } from ".";
import { createSlug } from "../utils/util-funcs";
import { Model } from "./Model";

@Entity({ name: "subcategories" })
export class SubCategory extends Model {
  // SUB CATEGORY MUST BE UNIQUE IN CATEGORY
  @Column({ type: "varchar", length: 64 })
  name: string;

  @Column()
  slug: string;

  // One Category Many SubCategory
  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];

  @BeforeUpdate()
  @BeforeInsert()
  formatFields() {
    this.name = this.name.toLowerCase();
    this.slug = createSlug(this.name);
  }
}
