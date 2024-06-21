import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { CreateFarmerPostUseCase } from 'domain/src/usecase/farmer-post/create-farmer-post.usecase';
import { CreateFarmerPostDTO } from 'src/adapters/in/http/farmer-posts/dto/create-farmer-post.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';
@Injectable()
export class HandlerCreateFarmerPost {
  constructor(
    @Inject(CreateFarmerPostUseCase)
    private readonly createFarmerPostUseCase: CreateFarmerPostUseCase,
  ) {}

  async execute(farmerPost: CreateFarmerPostDTO): Promise<HTTPPreResponse> {
    try {
      const farmerPostEntity = plainToClass(FarmerPostEntity, farmerPost);
      const newFarmerPost =
        await this.createFarmerPostUseCase.apply(farmerPostEntity);

      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Post created successfully',
        newFarmerPost,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.INTERNAL_SERVER_ERROR.code,
        error.message || 'Post could not be created',
      );
    }
  }
}
