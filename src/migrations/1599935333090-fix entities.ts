import {MigrationInterface, QueryRunner} from "typeorm";

export class fixEntities1599935333090 implements MigrationInterface {
    name = 'fixEntities1599935333090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "createdAt" TIME NOT NULL DEFAULT now(), "actionMessage" character varying NOT NULL, "affectedUserId" integer NOT NULL, "taskId" integer, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_8af100487cdc4cdb992e229fc74" FOREIGN KEY ("affectedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_4722723197fc68499799cafc066" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_4722723197fc68499799cafc066"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_8af100487cdc4cdb992e229fc74"`);
        await queryRunner.query(`DROP TABLE "log"`);
    }

}
