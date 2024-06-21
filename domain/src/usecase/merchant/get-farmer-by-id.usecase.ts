import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { IMerchantRepository } from 'domain/src/model/merchant/merchant.repository';

export class GetMerchantByIdUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async apply(id: number): Promise<MerchantEntity> {
    return await this.merchantRepository.getById(id);
  }
}
