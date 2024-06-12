import { EntitySchema } from 'typeorm';
import { AuthorEntity } from '../../../../../domain/src/model/author/author.entity';

export const AuthorEntitySchema = new EntitySchema<AuthorEntity>({
  name: 'Author',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
});
