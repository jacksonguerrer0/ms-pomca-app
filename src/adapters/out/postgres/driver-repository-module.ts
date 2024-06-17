import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntitySchema } from './entity-schemas/author.entity-schema';
import { AuthorRepository } from './repositories/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntitySchema])],
  providers: [AuthorRepository],
  exports: [AuthorRepository],
})
export class DriverRepositoryModule {}
