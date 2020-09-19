import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeDefaultStartColumnValueToFalse1600550947405 implements MigrationInterface {
    name = 'ChangeDefaultStartColumnValueToFalse1600550947405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "tracker" SET "isActive" = false WHERE "isActive" is null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "tracker" SET "isActive" = false WHERE "isActive" is null`);
    
    }

}
