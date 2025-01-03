import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { HandlerCreateMerchantPost } from 'src/handler/merchant-posts/create-merchant-post.handler';
import { HandlerDeleteMerchantPost } from 'src/handler/merchant-posts/delete-merchant-post.handler';
import { HandlerGetAllMerchantPosts } from 'src/handler/merchant-posts/get-all-merchant-posts.handler';
import { HandlerGetMerchantPostById } from 'src/handler/merchant-posts/get-merchant-post-by-id.handler';
import { HandlerUpdateMerchantPost } from 'src/handler/merchant-posts/update-merchant-post.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CreateMerchantPostDTO } from '../merchant-posts/dto/create-merchant-post.dto';
import { UpdateMerchantPostDTO } from '../merchant-posts/dto/update-merchant-post.dto';

@UseGuards(AuthGuard)
@ApiTags('Merchant Posts')
@Controller('v1/merchant-posts')
export class MerchantPostsController {
  constructor(
    private readonly handlerCreateMerchantPost: HandlerCreateMerchantPost,
    private readonly handlerGetMerchantPostById: HandlerGetMerchantPostById,
    private readonly handlerGetAllMerchantPosts: HandlerGetAllMerchantPosts,
    private readonly handlerUpdateMerchantPost: HandlerUpdateMerchantPost,
    private readonly handlerDeleteMerchantPost: HandlerDeleteMerchantPost,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<HTTPResponse> {
    return await this.handlerGetMerchantPostById.execute(id);
  }

  @Get()
  async getAll(@Query() filters: FilterPaginationDTO): Promise<HTTPResponse> {
    return await this.handlerGetAllMerchantPosts.execute(filters);
  }

  @Post()
  async create(@Body() request: CreateMerchantPostDTO): Promise<HTTPResponse> {
    return await this.handlerCreateMerchantPost.execute(request);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() request: UpdateMerchantPostDTO,
  ): Promise<HTTPResponse> {
    return await this.handlerUpdateMerchantPost.execute(id, request);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<HTTPResponse> {
    return await this.handlerDeleteMerchantPost.execute(id);
  }
}
