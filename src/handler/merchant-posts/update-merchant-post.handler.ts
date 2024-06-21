import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { GetMerchantPostUseCase } from 'domain/src/usecase/merchant-post/get-merchant-post.usecase';
import { UpdateMerchantPostUseCase } from 'domain/src/usecase/merchant-post/update-merchant-post.usecase';
import { UpdateMerchantPostDTO } from 'src/adapters/in/http/merchant-posts/dto/update-merchant-post.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerUpdateMerchantPost {
  constructor(
    @Inject(UpdateMerchantPostUseCase)
    private readonly updateMerchantPostUseCase: UpdateMerchantPostUseCase,
    @Inject(GetMerchantPostUseCase)
    private readonly getMerchantPostByIdUseCase: GetMerchantPostUseCase,
  ) {}

  async execute(
    id: number,
    merchantPost: UpdateMerchantPostDTO,
  ): Promise<HTTPPreResponse> {
    try {
      const currentPost = await this.getMerchantPostByIdUseCase.apply(id);
      const merchantPostEntity = plainToClass(MerchantPostEntity, {
        ...currentPost,
        ...merchantPost,
      });
      const updatedPost =
        await this.updateMerchantPostUseCase.apply(merchantPostEntity);
      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Post updated successfully',
        updatedPost,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        error.message,
      );
    }
  }
}
