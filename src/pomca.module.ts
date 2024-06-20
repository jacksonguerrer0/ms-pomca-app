import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author.module';
import { FarmerModule } from './modules/farmer.module';
import { DriverRepositoryModule } from './adapters/out/postgres/driver-repository-module';

@Module({
  imports: [DriverRepositoryModule, FarmerModule, AuthorModule],
})
export class PomcaModule {}
