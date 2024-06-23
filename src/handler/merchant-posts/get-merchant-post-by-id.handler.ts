import { Inject, Injectable } from '@nestjs/common';
import { GetMerchantPostUseCase } from 'domain/src/usecase/merchant-post/get-merchant-post.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetMerchantPostById {
  constructor(
    @Inject(GetMerchantPostUseCase)
    private readonly getMerchantPostUseCase: GetMerchantPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    const merchantPost = await this.getMerchantPostUseCase.apply(id);
    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Post retrieved successfully',
      merchantPost,
    );
  }
}
