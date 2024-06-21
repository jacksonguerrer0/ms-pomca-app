import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteMerchantPostUseCase } from 'domain/src/usecase/merchant-post/delete-merchant-post.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

// TODO: Adjust controll errors
@Injectable()
export class HandlerDeleteMerchantPost {
  constructor(
    @Inject(DeleteMerchantPostUseCase)
    private readonly deleteMerchantPostUseCase: DeleteMerchantPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    try {
      const isDeleted = await this.deleteMerchantPostUseCase.apply(id);

      return new HTTPResponse(
        HttpStatus.OK,
        'OK',
        'Post deleted successfully',
        isDeleted,
      );
    } catch (error) {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        error.message || 'Post could not be deleted',
      );
    }
  }
}
