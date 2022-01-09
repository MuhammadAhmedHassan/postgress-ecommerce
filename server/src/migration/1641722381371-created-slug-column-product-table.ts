import {MigrationInterface, QueryRunner} from "typeorm";

export class createdSlugColumnProductTable1641722381371 implements MigrationInterface {
    name = 'createdSlugColumnProductTable1641722381371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
    }

}
