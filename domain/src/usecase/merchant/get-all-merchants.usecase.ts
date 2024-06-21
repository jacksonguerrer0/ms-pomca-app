import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { IMerchantRepository } from 'domain/src/model/merchant/merchant.repository';

export class GetAllMerchantsUsecase {
  constructor(private merchantRepository: IMerchantRepository) {}

  async apply(
    filterOptions: IFilterOptions,
    paginationOptions: IPaginationOptions,
  ): Promise<IPaginatedResult<MerchantEntity>> {
    return this.merchantRepository.getAll(filterOptions, paginationOptions);
  }
}
