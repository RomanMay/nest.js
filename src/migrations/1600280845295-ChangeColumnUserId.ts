import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeColumnUserId1600280845295 implements MigrationInterface {
    name = 'ChangeColumnUserId1600280845295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "userId" TO "authorId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_30cb9d78297c1f2a2e07df1a616" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_30cb9d78297c1f2a2e07df1a616"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "authorId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
