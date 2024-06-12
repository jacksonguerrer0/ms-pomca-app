import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from 'domain/src/model/author/author.entity';
import { IAuthorRepository } from 'domain/src/model/author/author.repository';
import { Repository } from 'typeorm';
import { AuthorEntitySchema } from '../entity-schemas/author.entity-schema';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  constructor(
    @InjectRepository(AuthorEntitySchema)
    private authorRepository: Repository<AuthorEntity>,
  ) {}
  async getAuthor(id: number) {
    return this.authorRepository.findOne({ where: { id } });
  }
}
