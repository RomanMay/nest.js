import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSoftDelete1599936631082 implements MigrationInterface {
    name = 'AddSoftDelete1599936631082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deleted_at"`);
    }

}
