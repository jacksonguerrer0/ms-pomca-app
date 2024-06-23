import { Inject, Injectable } from '@nestjs/common';
import { GetAllMerchantsUsecase } from 'domain/src/usecase/merchant/get-all-merchants.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerGetAllMerchants {
  constructor(
    @Inject(GetAllMerchantsUsecase)
    private readonly getAllMerchantsUseCase: GetAllMerchantsUsecase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPResponse> {
    const { filterOptions, paginationOptions } =
      mapFilterPaginateOptions(query);
    const { data, pagination } = await this.getAllMerchantsUseCase.apply(
      filterOptions,
      paginationOptions,
    );

    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      'Merchants retrieved successfully',
      {
        merchants: data,
        pagination,
      },
    );
  }
}
