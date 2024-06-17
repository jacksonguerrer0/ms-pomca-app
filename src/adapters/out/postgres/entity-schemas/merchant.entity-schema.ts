import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { EntitySchema } from 'typeorm';

export const MerchantsEntitySchema = new EntitySchema<MerchantEntity>({
  name: 'Merchants',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    legal_name: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    phone_number: {
      type: String,
      nullable: true,
    },
    photo_url: {
      type: String,
      nullable: true,
    },
    rut_document_url: {
      type: String,
      nullable: false,
      unique: true,
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
