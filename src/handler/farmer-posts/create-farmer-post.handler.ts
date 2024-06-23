import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { CreateFarmerPostUseCase } from 'domain/src/usecase/farmer-post/create-farmer-post.usecase';
import { CreateFarmerPostDTO } from 'src/adapters/in/http/farmer-posts/dto/create-farmer-post.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';
@Injectable()
export class HandlerCreateFarmerPost {
  constructor(
    @Inject(CreateFarmerPostUseCase)
    private readonly createFarmerPostUseCase: CreateFarmerPostUseCase,
  ) {}

  async execute(farmerPost: CreateFarmerPostDTO): Promise<HTTPResponse> {
    const farmerPostEntity = plainToClass(FarmerPostEntity, farmerPost);
    const newFarmerPost =
      await this.createFarmerPostUseCase.apply(farmerPostEntity);

    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Post created successfully',
      newFarmerPost,
    );
  }
}
