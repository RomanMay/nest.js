import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultTaskStatus1596031604460 implements MigrationInterface {
    name = 'AddDefaultTaskStatus1596031604460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'OPEN'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
