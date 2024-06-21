import { Inject, Injectable } from '@nestjs/common';
import { GetAllMerchantsUsecase } from 'domain/src/usecase/merchant/get-all-merchants.usecase';
import { mapFilterPaginateOptions } from 'src/adapters/out/postgres/common/utils/map_filter_paginate.util';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerGetAllMerchants {
  constructor(
    @Inject(GetAllMerchantsUsecase)
    private readonly getAllMerchantsUseCase: GetAllMerchantsUsecase,
  ) {}

  async execute(query: FilterPaginationDTO): Promise<HTTPResponse> {
    try {
      const { filterOptions, paginationOptions } =
        mapFilterPaginateOptions(query);
      const { data, pagination } = await this.getAllMerchantsUseCase.apply(
        filterOptions,
        paginationOptions,
      );

      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        'OK',
        'Merchants retrieved successfully',
        { merchants: data, pagination },
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Merchants could not be retrieved',
      );
    }
  }
}
