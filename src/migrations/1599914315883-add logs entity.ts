import {MigrationInterface, QueryRunner} from "typeorm";

export class addLogsEntity1599914315883 implements MigrationInterface {
    name = 'addLogsEntity1599914315883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "createdAt" TIME NOT NULL DEFAULT now(), "log" character varying NOT NULL, "affectedUserId" integer, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_e2fe310d442a7ee21cf176b1b05" FOREIGN KEY ("affectedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_e2fe310d442a7ee21cf176b1b05"`);
        await queryRunner.query(`DROP TABLE "logs"`);
    }

}
