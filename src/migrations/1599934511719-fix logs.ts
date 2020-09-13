import {MigrationInterface, QueryRunner} from "typeorm";

export class fixLogs1599934511719 implements MigrationInterface {
    name = 'fixLogs1599934511719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "log_entity" ("id" SERIAL NOT NULL, "createdAt" TIME NOT NULL DEFAULT now(), "actionMessage" character varying NOT NULL, "affectedUserId" integer NOT NULL, "taskId" integer, CONSTRAINT "PK_db6e55781ba6e3d4fd6485cca24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "task_entity_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "task_entity_status_enum" NOT NULL DEFAULT 'OPEN', "userId" integer NOT NULL, "assignedUserId" integer, "projectId" integer, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "log_entity" ADD CONSTRAINT "FK_ca3a363110aa2bb69804faabd23" FOREIGN KEY ("affectedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log_entity" ADD CONSTRAINT "FK_76e6b99ed40c7a0ee0ace3e7d42" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_2621bebd84d2624da37a34797fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_4a3a49ca41655d73d1e9b199a67" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_059bf296d2b45a7c930faa15d7f" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_059bf296d2b45a7c930faa15d7f"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_4a3a49ca41655d73d1e9b199a67"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_2621bebd84d2624da37a34797fc"`);
        await queryRunner.query(`ALTER TABLE "log_entity" DROP CONSTRAINT "FK_76e6b99ed40c7a0ee0ace3e7d42"`);
        await queryRunner.query(`ALTER TABLE "log_entity" DROP CONSTRAINT "FK_ca3a363110aa2bb69804faabd23"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
        await queryRunner.query(`DROP TYPE "task_entity_status_enum"`);
        await queryRunner.query(`DROP TABLE "log_entity"`);
    }

}
