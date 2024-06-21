import { Inject, Injectable } from '@nestjs/common';
import { GetAllMerchantPostsUseCase } from 'domain/src/usecase/merchant-post/get-all-merchant-posts.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetAllMerchantPosts {
  constructor(
    @Inject(GetAllMerchantPostsUseCase)
    private readonly getAllMerchantPostsUseCase: GetAllMerchantPostsUseCase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPPreResponse> {
    try {
      const { filterOptions, paginationOptions } =
        mapFilterPaginateOptions(query);
      const { data, pagination } = await this.getAllMerchantPostsUseCase.apply(
        filterOptions,
        paginationOptions,
      );

      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Posts retrieved successfully',
        {
          posts: data,
          pagination,
        },
      );
    } catch {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        'Posts could not be retrieved',
      );
    }
  }
}
