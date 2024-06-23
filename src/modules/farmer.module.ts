import { Module } from '@nestjs/common';
import { IFarmerRepository } from 'domain/src/model/farmer/farmer.repository';
import { CreateFarmerUseCase } from 'domain/src/usecase/farmer/create-farmer.usecase';
import { GetAllFarmersUsecase } from 'domain/src/usecase/farmer/get-all-farmers.usecase';
import { GetFarmerByIdUseCase } from 'domain/src/usecase/farmer/get-farmer-by-id.usecase';
import { FarmersController } from 'src/adapters/in/http/farmers/farmers.controller';
import { LambdaModule } from 'src/adapters/out/lambda/lambda.module';
import { DriverRepositoryModule } from 'src/adapters/out/postgres/driver-repository-module';
import { FarmersRepository } from 'src/adapters/out/postgres/repositories/farmer.repository';
import { HandlerCreateFarmer } from 'src/handler/farmers/create-farmer.handler';
import { HandlerGetAllFarmers } from 'src/handler/farmers/get-all-farmers.handler';
import { HandlerGetFarmerById } from 'src/handler/farmers/get-farmer-by-id.handler';

@Module({
  imports: [DriverRepositoryModule, LambdaModule],
  providers: [
    HandlerCreateFarmer,
    HandlerGetFarmerById,
    HandlerGetAllFarmers,
    {
      provide: CreateFarmerUseCase,
      useFactory: (repository: IFarmerRepository) =>
        new CreateFarmerUseCase(repository),
      inject: [FarmersRepository],
    },
    {
      provide: GetFarmerByIdUseCase,
      useFactory: (repository: IFarmerRepository) =>
        new GetFarmerByIdUseCase(repository),
      inject: [FarmersRepository],
    },
    {
      provide: GetAllFarmersUsecase,
      useFactory: (repository: IFarmerRepository) =>
        new GetAllFarmersUsecase(repository),
      inject: [FarmersRepository],
    },
  ],
  controllers: [FarmersController],
})
export class FarmerModule {}
