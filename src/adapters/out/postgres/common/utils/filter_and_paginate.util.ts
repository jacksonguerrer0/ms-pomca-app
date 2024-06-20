import { ClassConstructor } from 'class-transformer';
import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { FindManyOptions, Repository } from 'typeorm';

export async function filterOptions(
  options: IFilterOptions,
  entity: ClassConstructor<Object>,
) {
  const { filters, order, orderBy, values } = options;
  if (filters.length === 0) return {};
  for (const option of filters) {
    const validOption = entity.hasOwnProperty(option);
    if (!validOption) throw new Error(`${option} is not a valid filter`);
  }

  const whereFilter = filters.reduce(
    (obj, filter, index) => ({ ...obj, [filter]: values[index] }),
    {},
  );

  return {
    where: whereFilter,
    order: {
      [orderBy]: order,
    },
  };
}

export async function filterAndPaginate<T>(
  repository: Repository<T>,
  options: IPaginationOptions,
  findOptions?: FindManyOptions<T>,
): Promise<IPaginatedResult<T>> {
  const page = options.page;
  const pageSize = options.pageSize;
  try {
      const [data, totalItems] = await repository.findAndCount({
        ...findOptions,
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
    },
  };
  } catch (error) {
      console.log('fata', error);

  }


}
