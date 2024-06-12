import { AuthorEntity } from "./author.entity";

export interface IAuthorRepository {
  getAuthor(id: number): Promise<AuthorEntity>
}
