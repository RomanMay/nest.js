import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTrackerColumns1600548775128 implements MigrationInterface {
    name = 'ChangeTrackerColumns1600548775128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "start" integer`);
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "tracked"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "tracked" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "tracked"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "tracked" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "start" TIMESTAMP`);
    }

}
