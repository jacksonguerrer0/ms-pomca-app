import { Inject, Injectable } from '@nestjs/common';
import { GetMerchantPostUseCase } from 'domain/src/usecase/merchant-post/get-merchant-post.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerGetMerchantPostById {
  constructor(
    @Inject(GetMerchantPostUseCase)
    private readonly getMerchantPostUseCase: GetMerchantPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    try {
      const merchantPost = await this.getMerchantPostUseCase.apply(id);
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        'OK',
        'Post retrieved successfully',
        merchantPost,
      );
    } catch (error) {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        error.message,
      );
    }
  }
}
