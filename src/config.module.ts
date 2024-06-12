import { Global, Module } from "@nestjs/common";
import { PostgresModule } from "./adapters/out/postgres/postgres.module";
import { CommonsModule } from "./commons/common.module";

@Global()
@Module({
  imports: [PostgresModule, CommonsModule],
})
export class ConfigModule {}