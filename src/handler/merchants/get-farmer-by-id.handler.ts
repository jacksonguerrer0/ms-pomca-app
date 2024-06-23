import { Inject, Injectable } from '@nestjs/common';
import { GetMerchantByIdUseCase } from 'domain/src/usecase/merchant/get-farmer-by-id.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetMerchantById {
  constructor(
    @Inject(GetMerchantByIdUseCase)
    private readonly getMerchantByIdUseCase: GetMerchantByIdUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    const farmer = await this.getMerchantByIdUseCase.apply(id);

    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Merchant retrieved successfully',
      farmer,
    );
  }
}
