import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { SignupFarmerUseCase } from 'domain/src/usecase/farmer/signup-farmer.usecase';
import { CreateFarmerDTO } from 'src/adapters/in/http/farmers/dto/create-farmer.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerSignupFarmer {
  constructor(
    @Inject(SignupFarmerUseCase)
    private readonly createFarmerUseCase: SignupFarmerUseCase,
  ) {}

  async execute(farmer: CreateFarmerDTO): Promise<HTTPResponse> {
    const newFarmer = plainToClass(FarmerEntity, farmer);
    const result = await this.createFarmerUseCase.apply(newFarmer);

    return new HTTPResponse(
      HttpStatusMapper.CREATED.status,
      'Farmer created successfully',
      result,
    );
  }
}
