import { IFilterPaginateOptions } from 'domain/src/common/commands/pagination.command';
import { PaginationOrderEnum } from 'domain/src/common/enum/pagination-order.enum';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';

export function mapFilterPaginateOptions(
  filter: FilterPaginationDTO,
): IFilterPaginateOptions {
  const filterOptions = {
    filters: filter.filters || [],
    values: filter.values || [],
    orderBy: filter.orderBy || 'created_at',
    order: filter.order || PaginationOrderEnum.DESC,
  };

  const paginationOptions = {
    page: filter.page || 1,
    pageSize: filter.pageSize || 10,
  };

  return { filterOptions, paginationOptions };
}
