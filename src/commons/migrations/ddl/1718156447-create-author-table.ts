import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthorTable1718156447 implements MigrationInterface {
  name = '1718156447';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE author (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS author;
    `);
  }
}
