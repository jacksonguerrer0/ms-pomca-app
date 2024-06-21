import { Inject, Injectable } from '@nestjs/common';
import { DeleteFarmerPostUseCase } from 'domain/src/usecase/farmer-post/delete-farmer-post.usecase';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

// TODO: Adjust controll errors
@Injectable()
export class HandlerDeleteFarmerPost {
  constructor(
    @Inject(DeleteFarmerPostUseCase)
    private readonly deleteFarmerPostUseCase: DeleteFarmerPostUseCase,
  ) {}

  async execute(id: number): Promise<HTTPPreResponse> {
    try {
      const isDeleted = await this.deleteFarmerPostUseCase.apply(id);

      return new HTTPPreResponse(
        HttpStatusMapper.CREATED.code,
        'Post deleted successfully',
        isDeleted,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        'BAD_REQUEST',
        error.message || 'Post could not be deleted',
      );
    }
  }
}
