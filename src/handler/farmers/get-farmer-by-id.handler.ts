import { Inject, Injectable } from '@nestjs/common';
import { GetFarmerByIdUseCase } from 'domain/src/usecase/farmer/get-farmer-by-id.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerGetFarmerById {
  constructor(
    @Inject(GetFarmerByIdUseCase)
    private readonly getFarmerByIdUseCase: GetFarmerByIdUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    try {
      const farmer = await this.getFarmerByIdUseCase.apply(id);

      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        'OK',
        'Farmer retrieved successfully',
        farmer,
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Farmer could not be retrieved',
      );
    }
  }
}
