import { Inject, Injectable } from '@nestjs/common';
import { GetFarmerPostUseCase } from 'domain/src/usecase/farmer-post/get-farmer-post.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerGetFarmerPostById {
  constructor(
    @Inject(GetFarmerPostUseCase)
    private readonly getFarmerPostUseCase: GetFarmerPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    try {
      const farmerPost = await this.getFarmerPostUseCase.apply(id);
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        'OK',
        'Post retrieved successfully',
        farmerPost,
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
