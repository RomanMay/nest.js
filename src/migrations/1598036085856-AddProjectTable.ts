import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProjectTable1598036085856 implements MigrationInterface {
    name = 'AddProjectTable1598036085856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_projects_project" ("userId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_26a180af1ec7a8550f5c374fcd8" PRIMARY KEY ("userId", "projectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_79daf0d2be103f4c30c77ddd6b" ON "user_projects_project" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936561888bfd63d01c79fe415c" ON "user_projects_project" ("projectId") `);
        await queryRunner.query(`ALTER TABLE "task" ADD "projectId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" ADD CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" ADD CONSTRAINT "FK_936561888bfd63d01c79fe415c3" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_projects_project" DROP CONSTRAINT "FK_936561888bfd63d01c79fe415c3"`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" DROP CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`);
        await queryRunner.query(`DROP INDEX "IDX_936561888bfd63d01c79fe415c"`);
        await queryRunner.query(`DROP INDEX "IDX_79daf0d2be103f4c30c77ddd6b"`);
        await queryRunner.query(`DROP TABLE "user_projects_project"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
