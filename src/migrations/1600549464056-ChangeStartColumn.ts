import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeStartColumn1600549464056 implements MigrationInterface {
    name = 'ChangeStartColumn1600549464056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "start" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "start" integer`);
    }

}
