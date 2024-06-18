import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFarmersTable1718592174 implements MigrationInterface {
  name = '1718592174';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE farmers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(20),
        photo_url VARCHAR(255),
        document_number VARCHAR(50) NOT NULL UNIQUE,
        document_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS farmers;
    `);
  }
}
