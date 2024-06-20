import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { IFarmerRepository } from 'domain/src/model/farmer/farmer.repository';

export class GetAllFarmersUsecase {
  constructor(private farmerRepository: IFarmerRepository) {}

  async apply(
    filterOptions: IFilterOptions,
    paginationOptions: IPaginationOptions,
  ): Promise<IPaginatedResult<FarmerEntity>> {
    return this.farmerRepository.getAll(filterOptions, paginationOptions);
  }
}
