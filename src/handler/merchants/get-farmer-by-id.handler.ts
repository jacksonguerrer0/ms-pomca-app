import { Inject, Injectable } from '@nestjs/common';
import { GetMerchantByIdUseCase } from 'domain/src/usecase/merchant/get-farmer-by-id.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerGetMerchantById {
  constructor(
    @Inject(GetMerchantByIdUseCase)
    private readonly getMerchantByIdUseCase: GetMerchantByIdUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    try {
      const farmer = await this.getMerchantByIdUseCase.apply(id);

      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        'OK',
        'Merchant retrieved successfully',
        farmer,
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Merchant could not be retrieved',
      );
    }
  }
}
