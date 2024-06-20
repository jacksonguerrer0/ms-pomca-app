import { DocumentTypeEnum } from 'domain/src/model/farmer/enums/document.enum';
import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { EntitySchema } from 'typeorm';

export const FarmerEntitySchema = new EntitySchema<FarmerEntity>({
  name: 'Farmers',
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
    last_name: {
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
      length: 255,
    },
    document_number: {
      type: String,
      nullable: false,
      unique: true,
      length: 50,
    },
    document_type: {
      type: 'enum',
      enum: DocumentTypeEnum,
      nullable: false,
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
