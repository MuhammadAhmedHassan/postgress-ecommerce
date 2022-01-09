import {
  Entity,
  Column,
  BeforeInsert,
  Index,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { Product } from ".";
import { createSlug } from "../utils/util-funcs";
import { Model } from "./Model";
import { SubCategory } from "./SubCategory";

@Entity({ name: "categories" })
export class Category extends Model {
  @Column({ type: "varchar", length: 64, unique: true })
  name: string;

  @Index({ unique: true })
  @Column({ unique: true })
  slug: string;

  @OneToMany(() => SubCategory, (subCat) => subCat.category, { cascade: true })
  subCategories: SubCategory[];

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];

  @BeforeUpdate()
  @BeforeInsert()
  formatFields() {
    this.name = this.name.toLowerCase();
    this.slug = createSlug(this.name);
  }
}
