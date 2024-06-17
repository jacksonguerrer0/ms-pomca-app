import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetHealthUsecase } from 'domain/src/usecase/health/get-health.usecase';
import { HealthController } from './adapters/in/http/health/health.controller';
import { TypeOrmHealthRepository } from './adapters/out/postgres/common/typeorm-health.repository';
import { PostgresModule } from './adapters/out/postgres/postgres.module';
import { HandlerGetServerHealth } from './handler/health/get-server-health.handler';

@Global()
@Module({
  imports: [PostgresModule],
  providers: [
    {
      provide: 'config',
      useValue: new ConfigService(),
    },
    {
      provide: 'TypeOrmHealthRepository',
      useClass: TypeOrmHealthRepository,
    },
    {
      provide: 'GetHealthUsecase',
      inject: ['TypeOrmHealthRepository'],
      useFactory: (repository) => new GetHealthUsecase(repository),
    },
    HandlerGetServerHealth,
  ],
  exports: ['config'],
  controllers: [HealthController],
})
export class ConfigModule {}
