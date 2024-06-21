import { Inject, Injectable } from '@nestjs/common';
import { GetAllFarmersUsecase } from 'domain/src/usecase/farmer/get-all-farmers.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetAllFarmers {
  constructor(
    @Inject(GetAllFarmersUsecase)
    private readonly getAllFarmersUseCase: GetAllFarmersUsecase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPPreResponse> {
    try {
      const { filterOptions, paginationOptions } =
        mapFilterPaginateOptions(query);
      const { data, pagination } = await this.getAllFarmersUseCase.apply(
        filterOptions,
        paginationOptions,
      );

      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        'Farmer retrieved successfully',
        { farmers: data, pagination },
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        error.message || 'Farmers could not be retrieved',
      );
    }
  }
}
