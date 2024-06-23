import { Module } from '@nestjs/common';
import { CreateMerchantUseCase } from 'domain/src/usecase/merchant/create-merchant.usecase';
import { GetAllMerchantsUsecase } from 'domain/src/usecase/merchant/get-all-merchants.usecase';
import { GetMerchantByIdUseCase } from 'domain/src/usecase/merchant/get-farmer-by-id.usecase';
import { MerchantsController } from 'src/adapters/in/http/merchants/merchants.controller';
import { LambdaModule } from 'src/adapters/out/lambda/lambda.module';
import { DriverRepositoryModule } from 'src/adapters/out/postgres/driver-repository-module';
import { MerchantRepository } from 'src/adapters/out/postgres/repositories/merchant.repository';
import { HandlerCreateMerchant } from 'src/handler/merchants/create-merchant.handler';
import { HandlerGetAllMerchants } from 'src/handler/merchants/get-all-farmers.handler';
import { HandlerGetMerchantById } from 'src/handler/merchants/get-farmer-by-id.handler';

@Module({
  imports: [DriverRepositoryModule, LambdaModule],
  providers: [
    HandlerCreateMerchant,
    HandlerGetAllMerchants,
    HandlerGetMerchantById,
    {
      provide: CreateMerchantUseCase,
      useFactory: (repository) => new CreateMerchantUseCase(repository),
      inject: [MerchantRepository],
    },
    {
      provide: GetAllMerchantsUsecase,
      useFactory: (repository) => new GetAllMerchantsUsecase(repository),
      inject: [MerchantRepository],
    },
    {
      provide: GetMerchantByIdUseCase,
      useFactory: (repository) => new GetMerchantByIdUseCase(repository),
      inject: [MerchantRepository],
    },
  ],
  controllers: [MerchantsController],
})
export class MerchantsModule {}
