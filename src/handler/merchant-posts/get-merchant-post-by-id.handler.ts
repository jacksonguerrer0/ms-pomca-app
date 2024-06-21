import { Inject, Injectable } from '@nestjs/common';
import { GetMerchantPostUseCase } from 'domain/src/usecase/merchant-post/get-merchant-post.usecase';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetMerchantPostById {
  constructor(
    @Inject(GetMerchantPostUseCase)
    private readonly getMerchantPostUseCase: GetMerchantPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPPreResponse> {
    try {
      const merchantPost = await this.getMerchantPostUseCase.apply(id);
      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Post retrieved successfully',
        merchantPost,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        error.message,
      );
    }
  }
}
