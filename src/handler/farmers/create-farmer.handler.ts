import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { CreateFarmerUseCase } from 'domain/src/usecase/farmer/create-farmer.usecase';
import { CreateFarmerDTO } from 'src/adapters/in/http/farmers/dto/create-farmer.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerCreateFarmer {
  constructor(
    @Inject(CreateFarmerUseCase)
    private readonly createFarmerUseCase: CreateFarmerUseCase,
  ) {}

  async execute(farmer: CreateFarmerDTO): Promise<HTTPResponse> {
    try {
      const newFarmer = plainToClass(FarmerEntity, farmer);
      const result = await this.createFarmerUseCase.apply(newFarmer);

      return new HTTPResponse(
        HttpStatus.CREATED,
        'CREATED',
        'Farmer created successfully',
        result,
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Farmer could not be created',
      );
    }
  }
}
