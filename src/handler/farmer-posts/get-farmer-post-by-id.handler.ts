import { Inject, Injectable } from '@nestjs/common';
import { GetFarmerPostUseCase } from 'domain/src/usecase/farmer-post/get-farmer-post.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetFarmerPostById {
  constructor(
    @Inject(GetFarmerPostUseCase)
    private readonly getFarmerPostUseCase: GetFarmerPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    const farmerPost = await this.getFarmerPostUseCase.apply(id);
    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Post retrieved successfully',
      farmerPost,
    );
  }
}
