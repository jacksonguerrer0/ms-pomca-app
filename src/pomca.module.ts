import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author.module';
import { FarmerModule } from './modules/farmer.module';
import { MerchantModule } from './modules/merchant.module';

@Module({
  imports: [FarmerModule, AuthorModule, MerchantModule],
})
export class PomcaModule {}
