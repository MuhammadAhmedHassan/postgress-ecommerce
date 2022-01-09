import {MigrationInterface, QueryRunner} from "typeorm";

export class createdSubcategoryTable1641648788357 implements MigrationInterface {
    name = 'createdSubcategoryTable1641648788357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcategories" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(64) NOT NULL, "slug" character varying NOT NULL, "categoryId" integer, CONSTRAINT "UQ_290ef46936579a55f65f81f5e4c" UNIQUE ("slug"), CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_290ef46936579a55f65f81f5e4" ON "subcategories" ("slug") `);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_d1fe096726c3c5b8a500950e448" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_d1fe096726c3c5b8a500950e448"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_290ef46936579a55f65f81f5e4"`);
        await queryRunner.query(`DROP TABLE "subcategories"`);
    }

}
