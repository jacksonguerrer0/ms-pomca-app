import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntitySchema } from './entity-schemas/author.entity-schema';
import { FarmerEntitySchema } from './entity-schemas/farmer.entity-schema';
import { MerchantEntitySchema } from './entity-schemas/merchant.entity-schema';
import { AuthorRepository } from './repositories/author.repository';
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
    ]),
  ],
  providers: [AuthorRepository, FarmersRepository, MerchantRepository],
  exports: [AuthorRepository, FarmersRepository, MerchantRepository],
})
export class DriverRepositoryModule {}
