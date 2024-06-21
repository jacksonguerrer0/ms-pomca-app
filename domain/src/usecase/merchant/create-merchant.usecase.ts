import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { IMerchantRepository } from 'domain/src/model/merchant/merchant.repository';

export class CreateMerchantUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async apply(merchant: MerchantEntity): Promise<MerchantEntity> {
    return await this.merchantRepository.save(merchant);
  }
}
