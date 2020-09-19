import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTaskToTrackerRelation1600539521518 implements MigrationInterface {
    name = 'ChangeTaskToTrackerRelation1600539521518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_0a5825e62fdbbf1c8ce77f7457e"`);
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "stop"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "trackerId"`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "isActive" boolean`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "tracked" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "taskId" integer`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD CONSTRAINT "UQ_f6cb08c6c57571b64990288456b" UNIQUE ("taskId")`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD CONSTRAINT "FK_f6cb08c6c57571b64990288456b" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" DROP CONSTRAINT "FK_f6cb08c6c57571b64990288456b"`);
        await queryRunner.query(`ALTER TABLE "tracker" DROP CONSTRAINT "UQ_f6cb08c6c57571b64990288456b"`);
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "taskId"`);
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "tracked"`);
        await queryRunner.query(`ALTER TABLE "tracker" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "trackerId" integer`);
        await queryRunner.query(`ALTER TABLE "tracker" ADD "stop" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_0a5825e62fdbbf1c8ce77f7457e" FOREIGN KEY ("trackerId") REFERENCES "tracker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
