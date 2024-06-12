import { MigrationInterface, QueryRunner } from 'typeorm';

export class LimitAuthorTable1718156448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION check_limit_author() RETURNS TRIGGER AS $$
      BEGIN
        IF (SELECT count(*) FROM author) >= 1 THEN
          RAISE EXCEPTION 'La tabla author solo puede tener un registro';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER check_insert_author BEFORE INSERT ON author
      FOR EACH ROW EXECUTE PROCEDURE check_limit_author();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS check_insert_author ON author;
      DROP FUNCTION IF EXISTS check_limit_author();
    `);
  }
}
