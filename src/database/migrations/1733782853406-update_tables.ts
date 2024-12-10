import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1733782853406 implements MigrationInterface {
    name = 'UpdateTables1733782853406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "rememberMe" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "rememberMe"`);
    }

}
