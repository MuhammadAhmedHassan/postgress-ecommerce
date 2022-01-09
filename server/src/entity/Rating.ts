import { Entity, Column, ManyToOne } from "typeorm";
import { User, Model, Product } from ".";

@Entity({ name: "ratings" })
export class Rating extends Model {
  // SUB CATEGORY MUST BE UNIQUE IN CATEGORY
  @Column({ type: "float" })
  star: number;

  // Many ratings will have a single user
  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  // Many ratings will have single product
  @ManyToOne(() => Product, (product) => product.ratings)
  product: User;
}
