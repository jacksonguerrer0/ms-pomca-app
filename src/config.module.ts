import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresModule } from './adapters/out/postgres/postgres.module';
import { HealthModule } from './modules/health.module';

@Global()
@Module({
  imports: [PostgresModule, HealthModule],
  providers: [
    {
      provide: 'config',
      useValue: new ConfigService(),
    },
  ],
  exports: ['config'],
})
export class ConfigModule {}
