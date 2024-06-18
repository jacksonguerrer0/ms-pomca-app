import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFarmerPostsTable1718592534 implements MigrationInterface {
  name = '1718592534';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE farmer_posts (
        id SERIAL PRIMARY KEY,
        farmer_id INT NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        images VARCHAR(255)[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS farmer_posts;
    `);
  }
}
