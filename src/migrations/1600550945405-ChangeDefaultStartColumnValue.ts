import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeDefaultStartColumnValue1600550945405 implements MigrationInterface {
    name = 'ChangeDefaultStartColumnValue1600550945405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "startDate" TIMESTAMP`);
        await queryRunner.query(`UPDATE "tracker" SET "isActive" = false WHERE "isActive" is null`);
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "isActive" DROP NOT NULL`);
        await queryRunner.query(`UPDATE "tracker" SET "isActive" = false WHERE "isActive" is null`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "start" TIMESTAMP`);
    }

}
