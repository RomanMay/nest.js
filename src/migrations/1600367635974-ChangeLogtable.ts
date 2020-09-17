import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeLogtable1600367635974 implements MigrationInterface {
    name = 'ChangeLogtable1600367635974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "log" ADD "ip" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "ip"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "city"`);
    }

}
