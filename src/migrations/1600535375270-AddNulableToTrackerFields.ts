import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNulableToTrackerFields1600535375270 implements MigrationInterface {
    name = 'AddNulableToTrackerFields1600535375270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "start" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "stop" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "stop" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "start" SET NOT NULL`);
    }

}
