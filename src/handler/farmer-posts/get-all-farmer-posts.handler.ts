import { Inject, Injectable } from '@nestjs/common';
import { GetAllFarmerPostsUseCase } from 'domain/src/usecase/farmer-post/get-all-farmer-posts.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerGetAllFarmerPosts {
  constructor(
    @Inject(GetAllFarmerPostsUseCase)
    private readonly getAllFarmerPostsUseCase: GetAllFarmerPostsUseCase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPResponse> {
    try {
      const { filterOptions, paginationOptions } =
        mapFilterPaginateOptions(query);
      const { data, pagination } = await this.getAllFarmerPostsUseCase.apply(
        filterOptions,
        paginationOptions,
      );

      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        'OK',
        'Posts retrieved successfully',
        { posts: data, pagination },
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Posts could not be retrieved',
      );
    }
  }
}
