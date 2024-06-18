import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
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
  const {filters, order, orderBy, values} = options;
  for (const option of filters) {
    try {
      const result = plainToInstance(entity, option);
      await validateOrReject(result);
    } catch {
      // TODO: Improve the error railway programming
      throw new Error(
        `${option} is not a valid filter`,
      );
    }
  }

  const whereFilter = filters.reduce((obj, filter, index) => ({...obj, [filter]: values[index] }), {})
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
  const page = options.page || 1;
  const pageSize = options.pageSize || 10;

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
}
