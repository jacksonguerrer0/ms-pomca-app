import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./typeorm.config";
import { AuthorRepository } from "./repositories/author.repository";

@Module({
  imports: [
    TypeOrmModule.forRoot({...typeOrmConfig()})
  ],
  providers: [AuthorRepository],
  exports: [AuthorRepository],
})
export class PostgresModule {}