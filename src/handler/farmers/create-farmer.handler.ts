import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { CreateFarmerUseCase } from 'domain/src/usecase/farmer/create-farmer.usecase';
import { CreateFarmerDTO } from 'src/adapters/in/http/farmers/dto/create-farmer.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerCreateFarmer {
  constructor(
    @Inject(CreateFarmerUseCase)
    private readonly createFarmerUseCase: CreateFarmerUseCase,
  ) {}

  async execute(farmer: CreateFarmerDTO): Promise<HTTPPreResponse> {
    try {
      const newFarmer = plainToClass(FarmerEntity, farmer);
      const result = await this.createFarmerUseCase.apply(newFarmer);

      return new HTTPPreResponse(
        HttpStatusMapper.CREATED.code,
        'Farmer created successfully',
        result,
      );
    } catch {
      return new HTTPPreResponse(
        HttpStatusMapper.INTERNAL_SERVER_ERROR.code,
        'Farmer could not be created',
      );
    }
  }
}
