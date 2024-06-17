import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMerchantsTable1718592318 implements MigrationInterface {
  name = '1718592318';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE merchants (
        id SERIAL PRIMARY KEY,
        legal_name VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(20),
        photo_url VARCHAR(255),
        rut_document_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS merchants;
    `);
  }
}
