import { Module } from '@nestjs/common';
import { CreateFarmerPostUseCase } from 'domain/src/usecase/farmer-post/create-farmer-post.usecase';
import { DeleteFarmerPostUseCase } from 'domain/src/usecase/farmer-post/delete-farmer-post.usecase';
import { GetAllFarmerPostsUseCase } from 'domain/src/usecase/farmer-post/get-all-farmer-posts.usecase';
import { GetFarmerPostUseCase } from 'domain/src/usecase/farmer-post/get-farmer-post.usecase';
import { UpdateFarmerPostUseCase } from 'domain/src/usecase/farmer-post/update-farmer-post.usecase';
import { GetFarmerByIdUseCase } from 'domain/src/usecase/farmer/get-farmer-by-id.usecase';
import { FarmerPostsController } from 'src/adapters/in/http/farmer-posts/farmer-posts.controller';
import { DriverRepositoryModule } from 'src/adapters/out/postgres/driver-repository-module';
import { FarmerPostRepository } from 'src/adapters/out/postgres/repositories/famer-post.repository';
import { HandlerCreateFarmerPost } from 'src/handler/farmer-posts/create-farmer-post.handler';
import { HandlerDeleteFarmerPost } from 'src/handler/farmer-posts/delete-farmer-post.handler';
import { HandlerGetAllFarmerPosts } from 'src/handler/farmer-posts/get-all-farmer-posts.handler';
import { HandlerGetFarmerPostById } from 'src/handler/farmer-posts/get-farmer-post-by-id.handler';
import { HandlerUpdateFarmerPost } from 'src/handler/farmer-posts/update-farmer-post.handler';

@Module({
  imports: [DriverRepositoryModule],
  providers: [
    HandlerCreateFarmerPost,
    HandlerDeleteFarmerPost,
    HandlerGetFarmerPostById,
    HandlerGetAllFarmerPosts,
    HandlerUpdateFarmerPost,
    {
      provide: CreateFarmerPostUseCase,
      useFactory: (repository) => new CreateFarmerPostUseCase(repository),
      inject: [FarmerPostRepository],
    },
    {
      provide: UpdateFarmerPostUseCase,
      useFactory: (repository) => new UpdateFarmerPostUseCase(repository),
      inject: [FarmerPostRepository],
    },
    {
      provide: DeleteFarmerPostUseCase,
      useFactory: (repository) => new DeleteFarmerPostUseCase(repository),
      inject: [FarmerPostRepository],
    },
    {
      provide: GetAllFarmerPostsUseCase,
      useFactory: (repository) => new GetAllFarmerPostsUseCase(repository),
      inject: [FarmerPostRepository],
    },
    {
      provide: GetFarmerPostUseCase,
      useFactory: (repository) => new GetFarmerPostUseCase(repository),
      inject: [FarmerPostRepository],
    },
  ],
  controllers: [FarmerPostsController],
})
export class FarmerPostsModule {}
