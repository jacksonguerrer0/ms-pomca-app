import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { MerchantEntity } from './merchant.entity';

export interface IMerchantRepository {
  save(data: MerchantEntity): Promise<MerchantEntity>;
  getById(id: number): Promise<MerchantEntity>;
  getAll(
    filter: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<MerchantEntity>>;
}
