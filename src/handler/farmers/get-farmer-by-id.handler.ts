import { Inject, Injectable } from '@nestjs/common';
import { GetFarmerByIdUseCase } from 'domain/src/usecase/farmer/get-farmer-by-id.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetFarmerById {
  constructor(
    @Inject(GetFarmerByIdUseCase)
    private readonly getFarmerByIdUseCase: GetFarmerByIdUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    const farmer = await this.getFarmerByIdUseCase.apply(id);
    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Farmer retrieved successfully',
      farmer,
    );
  }
}
