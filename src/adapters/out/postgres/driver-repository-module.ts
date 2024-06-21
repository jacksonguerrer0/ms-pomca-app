import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntitySchema } from './entity-schemas/author.entity-schema';
import { FarmerPostEntitySchema } from './entity-schemas/farmer-post.entity-schema';
import { FarmerEntitySchema } from './entity-schemas/farmer.entity-schema';
import { MerchantEntitySchema } from './entity-schemas/merchant.entity-schema';
import { AuthorRepository } from './repositories/author.repository';
import { FarmerPostRepository } from './repositories/famer-post.repository';
import { FarmersRepository } from './repositories/farmer.repository';
import { MerchantRepository } from './repositories/merchant.repository';
import { typeOrmConfig } from './typeorm.config';
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeOrmConfig() }),
    TypeOrmModule.forFeature([
      AuthorEntitySchema,
      FarmerEntitySchema,
      MerchantEntitySchema,
      FarmerPostEntitySchema,
    ]),
  ],
  providers: [
    AuthorRepository,
    FarmersRepository,
    MerchantRepository,
    FarmerPostRepository,
  ],
  exports: [
    AuthorRepository,
    FarmersRepository,
    MerchantRepository,
    FarmerPostRepository,
  ],
})
export class DriverRepositoryModule {}
