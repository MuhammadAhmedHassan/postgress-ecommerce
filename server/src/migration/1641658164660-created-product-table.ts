import {MigrationInterface, QueryRunner} from "typeorm";

export class createdProductTable1641658164660 implements MigrationInterface {
    name = 'createdProductTable1641658164660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_shipping_enum" AS ENUM('yes', 'no')`);
        await queryRunner.query(`CREATE TYPE "public"."products_color_enum" AS ENUM('black', 'brown', 'silver', 'white', 'blue')`);
        await queryRunner.query(`CREATE TYPE "public"."products_brand_enum" AS ENUM('apple', 'samsung', 'microsoft', 'lenovo', 'asus')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "sold" integer NOT NULL DEFAULT '0', "images" text NOT NULL, "shipping" "public"."products_shipping_enum" NOT NULL DEFAULT 'no', "color" "public"."products_color_enum" NOT NULL, "brand" "public"."products_brand_enum" NOT NULL, "categoryId" integer, "subCategoryId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "star" double precision NOT NULL, "userId" integer, "productId" integer, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ad42985fb27aa9016b16ee740ec" FOREIGN KEY ("subCategoryId") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_abcea824a43708933e5ac15a0e4" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_abcea824a43708933e5ac15a0e4"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ad42985fb27aa9016b16ee740ec"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_brand_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_color_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_shipping_enum"`);
    }

}
