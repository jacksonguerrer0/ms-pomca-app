import { Inject, Injectable } from '@nestjs/common';
import { DeleteMerchantPostUseCase } from 'domain/src/usecase/merchant-post/delete-merchant-post.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

// TODO: Adjust controll errors
@Injectable()
export class HandlerDeleteMerchantPost {
  constructor(
    @Inject(DeleteMerchantPostUseCase)
    private readonly deleteMerchantPostUseCase: DeleteMerchantPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    const isDeleted = await this.deleteMerchantPostUseCase.apply(id);

    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Post deleted successfully',
      isDeleted,
    );
  }
}
