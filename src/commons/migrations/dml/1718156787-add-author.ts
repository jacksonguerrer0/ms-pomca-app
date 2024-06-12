import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthorData1718156787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO author (id, name, bio) VALUES (1, 'Jack Guerrero', 'Hello! I am Jack Guerrero, a software developer.');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM author WHERE id = 1;
    `);
  }
}
