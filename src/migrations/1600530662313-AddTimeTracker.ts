import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTimeTracker1600530662313 implements MigrationInterface {
    name = 'AddTimeTracker1600530662313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tracker" ("id" SERIAL NOT NULL, "start" TIMESTAMP NOT NULL, "stop" TIMESTAMP NOT NULL, CONSTRAINT "PK_83bc756baca3e744e999194bd51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD "allTime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "trackerId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_0a5825e62fdbbf1c8ce77f7457e" FOREIGN KEY ("trackerId") REFERENCES "tracker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_0a5825e62fdbbf1c8ce77f7457e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "trackerId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "allTime"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
    }

}
