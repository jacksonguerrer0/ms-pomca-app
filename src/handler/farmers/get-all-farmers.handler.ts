import { Inject, Injectable } from '@nestjs/common';
import { GetAllFarmersUsecase } from 'domain/src/usecase/farmer/get-all-farmers.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerGetAllFarmers {
  constructor(
    @Inject(GetAllFarmersUsecase)
    private readonly getAllFarmersUseCase: GetAllFarmersUsecase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPResponse> {
    try {
      const { filterOptions, paginationOptions } =
        mapFilterPaginateOptions(query);
      const { data, pagination } = await this.getAllFarmersUseCase.apply(
        filterOptions,
        paginationOptions,
      );

      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        'OK',
        'Farmer retrieved successfully',
        { farmers: data, pagination },
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Farmers could not be retrieved',
      );
    }
  }
}
