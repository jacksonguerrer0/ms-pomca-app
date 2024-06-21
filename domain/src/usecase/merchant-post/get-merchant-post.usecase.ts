import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { IMerchantPostRepository } from 'domain/src/model/merchant-post/merchant-post.repository';

export class GetMerchantPostUseCase {
  constructor(
    private readonly merchantPostRepository: IMerchantPostRepository,
  ) {}

  async apply(id: number): Promise<MerchantPostEntity> {
    return await this.merchantPostRepository.getById(id);
  }
}
