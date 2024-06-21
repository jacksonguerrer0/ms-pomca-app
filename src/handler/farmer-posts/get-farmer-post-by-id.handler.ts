import { Inject, Injectable } from '@nestjs/common';
import { GetFarmerPostUseCase } from 'domain/src/usecase/farmer-post/get-farmer-post.usecase';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetFarmerPostById {
  constructor(
    @Inject(GetFarmerPostUseCase)
    private readonly getFarmerPostUseCase: GetFarmerPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPPreResponse> {
    try {
      const farmerPost = await this.getFarmerPostUseCase.apply(id);
      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Post retrieved successfully',
        farmerPost,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        error.message,
      );
    }
  }
}
