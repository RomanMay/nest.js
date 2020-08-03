import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEnumStatus1596033510398 implements MigrationInterface {
    name = 'AddEnumStatus1596033510398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "task_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" "task_status_enum" NOT NULL DEFAULT 'OPEN'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" character varying NOT NULL DEFAULT 'OPEN'`);
    }

}
