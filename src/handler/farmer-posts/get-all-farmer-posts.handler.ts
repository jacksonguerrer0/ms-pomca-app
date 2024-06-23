import { Inject, Injectable } from '@nestjs/common';
import { GetAllFarmerPostsUseCase } from 'domain/src/usecase/farmer-post/get-all-farmer-posts.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetAllFarmerPosts {
  constructor(
    @Inject(GetAllFarmerPostsUseCase)
    private readonly getAllFarmerPostsUseCase: GetAllFarmerPostsUseCase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPResponse> {
    const { filterOptions, paginationOptions } =
      mapFilterPaginateOptions(query);
    const { data, pagination } = await this.getAllFarmerPostsUseCase.apply(
      filterOptions,
      paginationOptions,
    );

    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Posts retrieved successfully',
      {
        posts: data,
        pagination,
      },
    );
  }
}
