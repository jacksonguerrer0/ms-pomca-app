import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { CreateFarmerPostUseCase } from 'domain/src/usecase/farmer-post/create-farmer-post.usecase';
import { CreateFarmerPostDTO } from 'src/adapters/in/http/farmer-posts/dto/create-farmer-post.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerCreateFarmerPost {
  constructor(
    @Inject(CreateFarmerPostUseCase)
    private readonly createFarmerPostUseCase: CreateFarmerPostUseCase,
  ) {}

  async execute(farmerPost: CreateFarmerPostDTO): Promise<HTTPResponse> {
    try {
      const farmerPostEntity = plainToClass(FarmerPostEntity, farmerPost);
      const newFarmerPost =
        await this.createFarmerPostUseCase.apply(farmerPostEntity);

      return new HTTPResponse(
        HttpStatus.CREATED,
        'CREATED',
        'Post created successfully',
        newFarmerPost,
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Post could not be created',
      );
    }
  }
}
