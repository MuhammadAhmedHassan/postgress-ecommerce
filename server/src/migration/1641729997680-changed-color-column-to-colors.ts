import {MigrationInterface, QueryRunner} from "typeorm";

export class changedColorColumnToColors1641729997680 implements MigrationInterface {
    name = 'changedColorColumnToColors1641729997680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "color" TO "colors"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "colors" TO "color"`);
    }

}
