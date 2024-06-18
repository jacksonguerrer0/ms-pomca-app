import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { EntitySchema } from 'typeorm';

export const MerchantPostEntitySchema = new EntitySchema<MerchantPostEntity>({
  name: 'MerchantPosts',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    merchant_id: {
      type: Number,
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
