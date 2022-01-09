import {MigrationInterface, QueryRunner} from "typeorm";

export class addedEmailFieldUserTable1641492013558 implements MigrationInterface {
    name = 'addedEmailFieldUserTable1641492013558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }

}
