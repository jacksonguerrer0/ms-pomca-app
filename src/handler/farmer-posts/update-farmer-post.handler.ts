import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { GetFarmerPostUseCase } from 'domain/src/usecase/farmer-post/get-farmer-post.usecase';
import { UpdateFarmerPostUseCase } from 'domain/src/usecase/farmer-post/update-farmer-post.usecase';
import { UpdateFarmerPostDTO } from 'src/adapters/in/http/farmer-posts/dto/update-farmer-post.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerUpdateFarmerPost {
  constructor(
    @Inject(UpdateFarmerPostUseCase)
    private readonly updateFarmerPostUseCase: UpdateFarmerPostUseCase,
    @Inject(GetFarmerPostUseCase)
    private readonly getFarmerPostByIdUseCase: GetFarmerPostUseCase,
  ) {}

  async execute(
    id: number,
    farmerPost: UpdateFarmerPostDTO,
  ): Promise<HTTPResponse> {
    try {
      const currentPost = await this.getFarmerPostByIdUseCase.apply(id);
      const farmerPostEntity = plainToClass(FarmerPostEntity, {
        ...currentPost,
        ...farmerPost,
      });
      const updatedPost =
        await this.updateFarmerPostUseCase.apply(farmerPostEntity);
      return new HTTPResponse(
        HttpStatus.PARTIAL_CONTENT,
        'UPDATED',
        'Post updated successfully',
        updatedPost,
      );
    } catch (error) {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        error.message || 'Post could not be updated',
      );
    }
  }
}
