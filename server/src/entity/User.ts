import { Entity, Column, BeforeInsert, Index, OneToMany } from "typeorm";
import { Password } from "../utils/Password";
import { Model, Rating } from ".";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  SUBSCRIBER = "subscriber",
}

@Entity({ name: "users" })
export class User extends Model {
  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.SUBSCRIBER,
  })
  role: UserRole;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "simple-array" })
  cart: string[];

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  picture: string;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await Password.toHash(this.password);
  }

  toJSON() {
    return { ...super.toJSON(), password: undefined };
  }
}
