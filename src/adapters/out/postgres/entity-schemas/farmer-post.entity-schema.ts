import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { EntitySchema } from 'typeorm';

export const FarmerPostEntitySchema = new EntitySchema<FarmerPostEntity>({
  name: 'FarmerPosts',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    farmer_id: {
      type: Number,
      nullable: false,
    },
    title: {
      type: String,
      nullable: false,
    },
    description: {
      type: String,
      nullable: false,
      length: 1000,
    },
    images: {
      type: 'varchar',
      length: 255,
      nullable: true,
      array: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});
