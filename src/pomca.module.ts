import { Module } from '@nestjs/common';
import { GetAuthorUsecase } from 'domain/src/usecase/author/get-author.usecase';
import { AuthorController } from './adapters/in/http/author/author.controller';
import { AuthorRepository } from './adapters/out/postgres/repositories/author.repository';
import { HandlerGetAuthor } from './handler/author/get-author-handler';

@Module({
  providers: [
    {
      provide: 'AuthorRepository',
      useClass: AuthorRepository,
    },
    {
      provide: 'GetAuthorUsecase',
      inject: ['AuthorRepository'],
      useFactory: (repository) => new GetAuthorUsecase(repository),
    },
    HandlerGetAuthor,
  ],
  controllers: [AuthorController],
})
export class PomcaModule {}
