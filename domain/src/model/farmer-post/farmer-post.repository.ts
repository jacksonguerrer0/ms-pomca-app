import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { FarmerPostEntity } from './farmer-post.entity';

export interface IFarmerPostRepository {
  save(data: FarmerPostEntity): Promise<FarmerPostEntity>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<FarmerPostEntity>;
  getAll(
    option: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<FarmerPostEntity>>;
}
