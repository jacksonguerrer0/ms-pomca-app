import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntitySchema } from './entity-schemas/author.entity-schema';
import { FarmerEntitySchema } from './entity-schemas/farmer.entity-schema';
import { AuthorRepository } from './repositories/author.repository';
import { FarmersRepository } from './repositories/farmer.repository';
import { typeOrmConfig } from './typeorm.config';
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeOrmConfig() }),
    TypeOrmModule.forFeature([AuthorEntitySchema, FarmerEntitySchema]),
  ],
  providers: [AuthorRepository, FarmersRepository],
  exports: [AuthorRepository, FarmersRepository],
})
export class DriverRepositoryModule {}
