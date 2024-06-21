import { Inject, Injectable } from '@nestjs/common';
import { DeleteMerchantPostUseCase } from 'domain/src/usecase/merchant-post/delete-merchant-post.usecase';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

// TODO: Adjust controll errors
@Injectable()
export class HandlerDeleteMerchantPost {
  constructor(
    @Inject(DeleteMerchantPostUseCase)
    private readonly deleteMerchantPostUseCase: DeleteMerchantPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPPreResponse> {
    try {
      const isDeleted = await this.deleteMerchantPostUseCase.apply(id);

      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Post deleted successfully',
        isDeleted,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        error.message || 'Post could not be deleted',
      );
    }
  }
}
