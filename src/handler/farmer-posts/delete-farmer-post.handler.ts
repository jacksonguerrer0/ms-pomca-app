import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteFarmerPostUseCase } from 'domain/src/usecase/farmer-post/delete-farmer-post.usecase';
import { GetFarmerByIdUseCase } from 'domain/src/usecase/farmer/get-farmer-by-id.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

// TODO: Adjust controll errors
@Injectable()
export class HandlerDeleteFarmerPost {
  constructor(
    @Inject(DeleteFarmerPostUseCase)
    private readonly deleteFarmerPostUseCase: DeleteFarmerPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    try {
      const isDeleted = await this.deleteFarmerPostUseCase.apply(id);

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
