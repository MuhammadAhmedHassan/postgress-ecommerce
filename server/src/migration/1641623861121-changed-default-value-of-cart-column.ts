import {MigrationInterface, QueryRunner} from "typeorm";

export class changedDefaultValueOfCartColumn1641623861121 implements MigrationInterface {
    name = 'changedDefaultValueOfCartColumn1641623861121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cart" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cart" SET DEFAULT '[]'`);
    }

}
