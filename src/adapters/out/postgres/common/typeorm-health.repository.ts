import { InjectEntityManager } from '@nestjs/typeorm';
import { IHealthRepository } from 'domain/src/model/health/interface/health.repository';
import { EntityManager } from 'typeorm';
import { dataSource } from '../migration.connection';

export class TypeOrmHealthRepository implements IHealthRepository {
  constructor(
    @InjectEntityManager(dataSource)
    private readonly database: EntityManager,
  ) {}

  async check(): Promise<boolean> {
    const health = await this.database.query('SELECT 1');
    return !!health;
  }
}
