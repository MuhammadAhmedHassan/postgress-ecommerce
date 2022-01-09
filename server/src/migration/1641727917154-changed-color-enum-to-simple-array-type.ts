import {MigrationInterface, QueryRunner} from "typeorm";

export class changedColorEnumToSimpleArrayType1641727917154 implements MigrationInterface {
    name = 'changedColorEnumToSimpleArrayType1641727917154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "color"`);
        await queryRunner.query(`DROP TYPE "public"."products_color_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "color" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "color"`);
        await queryRunner.query(`CREATE TYPE "public"."products_color_enum" AS ENUM('black', 'brown', 'silver', 'white', 'blue')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "color" "public"."products_color_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
    }

}
