import { Inject, Injectable } from '@nestjs/common';
import { GetMerchantByIdUseCase } from 'domain/src/usecase/merchant/get-farmer-by-id.usecase';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetMerchantById {
  constructor(
    @Inject(GetMerchantByIdUseCase)
    private readonly getMerchantByIdUseCase: GetMerchantByIdUseCase,
  ) {}

  async execute(id: number): Promise<HTTPPreResponse> {
    try {
      const farmer = await this.getMerchantByIdUseCase.apply(id);

      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Merchant retrieved successfully',
        farmer,
      );
    } catch {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        'Merchant could not be retrieved',
      );
    }
  }
}
