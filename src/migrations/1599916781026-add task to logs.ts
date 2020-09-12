import {MigrationInterface, QueryRunner} from "typeorm";

export class addTaskToLogs1599916781026 implements MigrationInterface {
    name = 'addTaskToLogs1599916781026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "log"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "logMessage" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "taskId" integer`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_b5d7428e6b7bd5d44531c4d623c" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_b5d7428e6b7bd5d44531c4d623c"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "taskId"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "logMessage"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "log" character varying NOT NULL`);
    }

}
