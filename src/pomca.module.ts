import { Module } from '@nestjs/common';
import { IAuthorRepository } from 'domain/src/model/author/author.repository';
import { GetAuthorUsecase } from 'domain/src/usecase/author/get-author.usecase';
import { AuthorController } from './adapters/in/http/author/author.controller';
import { DriverRepositoryModule } from './adapters/out/postgres/driver-repository-module';
import { AuthorRepository } from './adapters/out/postgres/repositories/author.repository';
import { HandlerGetAuthor } from './handler/author/get-author-handler';

@Module({
  imports: [DriverRepositoryModule],
  providers: [
    {
      provide: HandlerGetAuthor,
      useFactory: (usecase: GetAuthorUsecase) => new HandlerGetAuthor(usecase),
      inject: [GetAuthorUsecase],
    },
    {
      provide: GetAuthorUsecase,
      useFactory: (repository: IAuthorRepository) =>
        new GetAuthorUsecase(repository),
      inject: [AuthorRepository],
    },
  ],
  controllers: [AuthorController],
})
export class PomcaModule {}
