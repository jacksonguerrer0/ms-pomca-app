import { Inject, Injectable } from '@nestjs/common';
import { DeleteFarmerPostUseCase } from 'domain/src/usecase/farmer-post/delete-farmer-post.usecase';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

// TODO: Adjust controll errors
@Injectable()
export class HandlerDeleteFarmerPost {
  constructor(
    @Inject(DeleteFarmerPostUseCase)
    private readonly deleteFarmerPostUseCase: DeleteFarmerPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPResponse> {
    const isDeleted = await this.deleteFarmerPostUseCase.apply(id);

    return new HTTPResponse(
      HttpStatusMapper.CREATED.status,
      'Post deleted successfully',
      isDeleted,
    );
  }
}
