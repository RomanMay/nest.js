import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTaskStatusEnum1599938793231 implements MigrationInterface {
    name = 'ChangeTaskStatusEnum1599938793231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."task_status_enum" RENAME TO "task_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "task_status_enum" AS ENUM('open', 'in progress', 'done', 'OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" TYPE "task_status_enum" USING "status"::"text"::"task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'open'`);
        await queryRunner.query(`DROP TYPE "task_status_enum_old"`);

        await queryRunner.query(`UPDATE task SET status = 'open' WHERE status = 'OPEN'`)
        await queryRunner.query(`UPDATE task SET status = 'in progress' WHERE status = 'IN_PROGRESS'`)
        await queryRunner.query(`UPDATE task SET status = 'done' WHERE status = 'DONE'`)


        await queryRunner.query(`ALTER TYPE "public"."task_status_enum" RENAME TO "task_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "task_status_enum" AS ENUM('open', 'in progress', 'done')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" TYPE "task_status_enum" USING "status"::"text"::"task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'open'`);
        await queryRunner.query(`DROP TYPE "task_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'OPEN'`);
        await queryRunner.query(`CREATE TYPE "task_status_enum_old" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" TYPE "task_status_enum_old" USING "status"::"text"::"task_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'open'`);
        await queryRunner.query(`DROP TYPE "task_status_enum"`);
        await queryRunner.query(`ALTER TYPE "task_status_enum_old" RENAME TO  "task_status_enum"`);
    }

}
