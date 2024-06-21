import { Module } from '@nestjs/common';
import { CreateMerchantPostUseCase } from 'domain/src/usecase/merchant-post/create-merchant-post.usecase';
import { DeleteMerchantPostUseCase } from 'domain/src/usecase/merchant-post/delete-merchant-post.usecase';
import { GetAllMerchantPostsUseCase } from 'domain/src/usecase/merchant-post/get-all-merchant-posts.usecase';
import { GetMerchantPostUseCase } from 'domain/src/usecase/merchant-post/get-merchant-post.usecase';
import { UpdateMerchantPostUseCase } from 'domain/src/usecase/merchant-post/update-merchant-post.usecase';
import { MerchantPostsController } from 'src/adapters/in/http/merchant-posts/merchant-posts.controller';
import { DriverRepositoryModule } from 'src/adapters/out/postgres/driver-repository-module';
import { MerchantPostRepository } from 'src/adapters/out/postgres/repositories/merchant-post.repository';
import { HandlerCreateMerchantPost } from 'src/handler/merchant-posts/create-merchant-post.handler';
import { HandlerDeleteMerchantPost } from 'src/handler/merchant-posts/delete-merchant-post.handler';
import { HandlerGetAllMerchantPosts } from 'src/handler/merchant-posts/get-all-merchant-posts.handler';
import { HandlerGetMerchantPostById } from 'src/handler/merchant-posts/get-merchant-post-by-id.handler';
import { HandlerUpdateMerchantPost } from 'src/handler/merchant-posts/update-merchant-post.handler';

@Module({
  imports: [DriverRepositoryModule],
  providers: [
    HandlerCreateMerchantPost,
    HandlerDeleteMerchantPost,
    HandlerGetMerchantPostById,
    HandlerGetAllMerchantPosts,
    HandlerUpdateMerchantPost,
    {
      provide: CreateMerchantPostUseCase,
      useFactory: (repository) => new CreateMerchantPostUseCase(repository),
      inject: [MerchantPostRepository],
    },
    {
      provide: UpdateMerchantPostUseCase,
      useFactory: (repository) => new UpdateMerchantPostUseCase(repository),
      inject: [MerchantPostRepository],
    },
    {
      provide: DeleteMerchantPostUseCase,
      useFactory: (repository) => new DeleteMerchantPostUseCase(repository),
      inject: [MerchantPostRepository],
    },
    {
      provide: GetAllMerchantPostsUseCase,
      useFactory: (repository) => new GetAllMerchantPostsUseCase(repository),
      inject: [MerchantPostRepository],
    },
    {
      provide: GetMerchantPostUseCase,
      useFactory: (repository) => new GetMerchantPostUseCase(repository),
      inject: [MerchantPostRepository],
    },
  ],
  controllers: [MerchantPostsController],
})
export class MerchantPostsModule {}
