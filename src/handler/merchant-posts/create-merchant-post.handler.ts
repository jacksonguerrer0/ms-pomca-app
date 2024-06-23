import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { CreateMerchantPostUseCase } from 'domain/src/usecase/merchant-post/create-merchant-post.usecase';
import { CreateMerchantPostDTO } from 'src/adapters/in/http/merchant-posts/dto/create-merchant-post.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerCreateMerchantPost {
  constructor(
    @Inject(CreateMerchantPostUseCase)
    private readonly createMerchantPostUseCase: CreateMerchantPostUseCase,
  ) {}

  async execute(merchantPost: CreateMerchantPostDTO): Promise<HTTPResponse> {
    const merchantPostEntity = plainToClass(MerchantPostEntity, merchantPost);
    const newMerchantPost =
      await this.createMerchantPostUseCase.apply(merchantPostEntity);

    return new HTTPResponse(
      HttpStatusMapper.CREATED.status,
      'Post created successfully',
      newMerchantPost,
    );
  }
}
