import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { MerchantPostEntity } from './merchant-post.entity';

export interface IMerchantPostRepository {
  save(data: MerchantPostEntity): Promise<MerchantPostEntity>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<MerchantPostEntity>;
  getAll(
    option: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<MerchantPostEntity>>;
}
