import { Module } from '@nestjs/common';
import { CommonsModule } from './commons/common.module';
import { ConfigModule } from './config.module';
import { PomcaModule } from './pomca.module';

@Module({
  imports: [CommonsModule, ConfigModule, PomcaModule],
})
export class AppModule {}
