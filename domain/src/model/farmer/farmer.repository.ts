import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { FarmerEntity } from './farmer.entity';

export interface IFarmerRepository {
  save(data: FarmerEntity): Promise<FarmerEntity>;
  getById(id: number): Promise<FarmerEntity>;
  getAll(
    filter: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<FarmerEntity>>;
}
