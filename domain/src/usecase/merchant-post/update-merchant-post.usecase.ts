import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { IMerchantPostRepository } from 'domain/src/model/merchant-post/merchant-post.repository';

export class UpdateMerchantPostUseCase {
  constructor(
    private readonly merchantPostRepository: IMerchantPostRepository,
  ) {}

  async apply(data: MerchantPostEntity): Promise<MerchantPostEntity> {
    return await this.merchantPostRepository.save(data);
  }
}
