import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { IMerchantPostRepository } from 'domain/src/model/merchant-post/merchant-post.repository';

export class GetAllMerchantPostsUseCase {
  constructor(private merchantPostRepository: IMerchantPostRepository) {}

  async apply(
    option: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<MerchantPostEntity>> {
    return await this.merchantPostRepository.getAll(option, pagination);
  }
}
