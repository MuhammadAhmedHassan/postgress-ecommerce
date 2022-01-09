import {MigrationInterface, QueryRunner} from "typeorm";

export class removedIndexFromSlugSubcategory1641651303336 implements MigrationInterface {
    name = 'removedIndexFromSlugSubcategory1641651303336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_290ef46936579a55f65f81f5e4"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "UQ_290ef46936579a55f65f81f5e4c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "UQ_290ef46936579a55f65f81f5e4c" UNIQUE ("slug")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_290ef46936579a55f65f81f5e4" ON "subcategories" ("slug") `);
    }

}
