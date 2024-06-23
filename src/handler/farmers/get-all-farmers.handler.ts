import { Inject, Injectable } from '@nestjs/common';
import { GetAllFarmersUsecase } from 'domain/src/usecase/farmer/get-all-farmers.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetAllFarmers {
  constructor(
    @Inject(GetAllFarmersUsecase)
    private readonly getAllFarmersUseCase: GetAllFarmersUsecase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPResponse> {
    const { filterOptions, paginationOptions } =
      mapFilterPaginateOptions(query);
    const { data, pagination } = await this.getAllFarmersUseCase.apply(
      filterOptions,
      paginationOptions,
    );

    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Farmer retrieved successfully',
      { farmers: data, pagination },
    );
  }
}
