import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { CreateMerchantPostUseCase } from 'domain/src/usecase/merchant-post/create-merchant-post.usecase';
import { CreateMerchantPostDTO } from 'src/adapters/in/http/merchant-posts/dto/create-merchant-post.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerCreateMerchantPost {
  constructor(
    @Inject(CreateMerchantPostUseCase)
    private readonly createMerchantPostUseCase: CreateMerchantPostUseCase,
  ) {}

  async execute(merchantPost: CreateMerchantPostDTO): Promise<HTTPResponse> {
    try {
      const merchantPostEntity = plainToClass(MerchantPostEntity, merchantPost);
      const newMerchantPost =
        await this.createMerchantPostUseCase.apply(merchantPostEntity);

      return new HTTPResponse(
        HttpStatus.CREATED,
        'CREATED',
        'Post created successfully',
        newMerchantPost,
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
