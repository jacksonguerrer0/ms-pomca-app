import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author.module';
import { FarmerPostsModule } from './modules/farmer-posts.module';
import { FarmerModule } from './modules/farmer.module';
import { MerchantPostsModule } from './modules/merchant-posts.module';
import { MerchantsModule } from './modules/merchants.module';

@Module({
  imports: [
    FarmerModule,
    AuthorModule,
    MerchantsModule,
    FarmerPostsModule,
    MerchantPostsModule,
  ],
})
export class PomcaModule {}
