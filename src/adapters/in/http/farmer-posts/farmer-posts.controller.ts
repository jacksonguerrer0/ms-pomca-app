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
import { HandlerCreateFarmerPost } from 'src/handler/farmer-posts/create-farmer-post.handler';
import { HandlerDeleteFarmerPost } from 'src/handler/farmer-posts/delete-farmer-post.handler';
import { HandlerGetAllFarmerPosts } from 'src/handler/farmer-posts/get-all-farmer-posts.handler';
import { HandlerGetFarmerPostById } from 'src/handler/farmer-posts/get-farmer-post-by-id.handler';
import { HandlerUpdateFarmerPost } from 'src/handler/farmer-posts/update-farmer-post.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CreateFarmerPostDTO } from './dto/create-farmer-post.dto';
import { UpdateFarmerPostDTO } from './dto/update-farmer-post.dto';

@UseGuards(AuthGuard)
@ApiTags('Farmer Posts')
@Controller('v1/farmer-posts')
export class FarmerPostsController {
  constructor(
    private readonly handlerCreateFarmerPost: HandlerCreateFarmerPost,
    private readonly handlerGetFarmerPostById: HandlerGetFarmerPostById,
    private readonly handlerGetAllFarmerPosts: HandlerGetAllFarmerPosts,
    private readonly handlerUpdateFarmerPost: HandlerUpdateFarmerPost,
    private readonly handlerDeleteFarmerPost: HandlerDeleteFarmerPost,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<HTTPResponse> {
    return await this.handlerGetFarmerPostById.execute(id);
  }

  @Get()
  async getAll(@Query() filters: FilterPaginationDTO): Promise<HTTPResponse> {
    return await this.handlerGetAllFarmerPosts.execute(filters);
  }

  @Post()
  async create(@Body() request: CreateFarmerPostDTO): Promise<HTTPResponse> {
    return await this.handlerCreateFarmerPost.execute(request);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() request: UpdateFarmerPostDTO,
  ): Promise<HTTPResponse> {
    return await this.handlerUpdateFarmerPost.execute(id, request);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<HTTPResponse> {
    return await this.handlerDeleteFarmerPost.execute(id);
  }
}
