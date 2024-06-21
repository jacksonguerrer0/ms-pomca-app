import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { IFarmerPostRepository } from 'domain/src/model/farmer-post/farmer-post.repository';

export class GetAllFarmerPostsUseCase {
  constructor(private farmerPostRepository: IFarmerPostRepository) {}

  async apply(
    option: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<FarmerPostEntity>> {
    return await this.farmerPostRepository.getAll(option, pagination);
  }
}
