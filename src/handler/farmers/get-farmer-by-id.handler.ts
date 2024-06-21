import { Inject, Injectable } from '@nestjs/common';
import { GetFarmerByIdUseCase } from 'domain/src/usecase/farmer/get-farmer-by-id.usecase';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetFarmerById {
  constructor(
    @Inject(GetFarmerByIdUseCase)
    private readonly getFarmerByIdUseCase: GetFarmerByIdUseCase,
  ) {}

  async execute(id: number): Promise<HTTPPreResponse> {
    try {
      const farmer = await this.getFarmerByIdUseCase.apply(id);
      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Farmer retrieved successfully',
        farmer,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        error.message || 'Farmer could not be retrieved',
      );
    }
  }
}
