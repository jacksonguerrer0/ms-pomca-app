import { Module } from '@nestjs/common';
import { GetAllMerchantsUsecase } from 'domain/src/usecase/merchant/get-all-merchants.usecase';
import { GetMerchantByIdUseCase } from 'domain/src/usecase/merchant/get-farmer-by-id.usecase';
import { CreateMerchantService } from 'domain/src/usecase/merchant/services/create-merchant.service';
import { SignupMerchantUseCase } from 'domain/src/usecase/merchant/signup-merchant.usecase';
import { MerchantsController } from 'src/adapters/in/http/merchants/merchants.controller';
import { LambdaModule } from 'src/adapters/out/lambda/lambda.module';
import { DriverRepositoryModule } from 'src/adapters/out/postgres/driver-repository-module';
import { MerchantRepository } from 'src/adapters/out/postgres/repositories/merchant.repository';
import { HandlerGetAllMerchants } from 'src/handler/merchants/get-all-farmers.handler';
import { HandlerGetMerchantById } from 'src/handler/merchants/get-farmer-by-id.handler';
import { HandlerSignupMerchant } from 'src/handler/merchants/signup-merchant.handler';

@Module({
  imports: [DriverRepositoryModule, LambdaModule],
  providers: [
    HandlerSignupMerchant,
    HandlerGetAllMerchants,
    HandlerGetMerchantById,
    {
      provide: SignupMerchantUseCase,
      useFactory: (service) => new SignupMerchantUseCase(service),
      inject: [CreateMerchantService],
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
    {
      provide: CreateMerchantService,
      useFactory: (repository) => new CreateMerchantService(repository),
      inject: [MerchantRepository],
    },
  ],
  controllers: [MerchantsController],
})
export class MerchantsModule {}
