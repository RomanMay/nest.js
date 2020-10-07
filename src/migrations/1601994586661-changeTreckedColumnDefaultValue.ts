import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTreckedColumnDefaultValue1601994586661 implements MigrationInterface {
    name = 'changeTreckedColumnDefaultValue1601994586661'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`UPDATE "tracker" SET "tracked" = 0 where "tracked" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "tracked" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "tracked" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "tracked" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tracker" ALTER COLUMN "tracked" DROP NOT NULL`);
    }

}
