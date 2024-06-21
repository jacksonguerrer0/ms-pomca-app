import { IMerchantPostRepository } from 'domain/src/model/merchant-post/merchant-post.repository';

export class DeleteMerchantPostUseCase {
  constructor(private merchantPostRepository: IMerchantPostRepository) {}

  async apply(id: number): Promise<boolean> {
    return await this.merchantPostRepository.delete(id);
  }
}
