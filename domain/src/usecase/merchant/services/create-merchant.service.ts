import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { IMerchantRepository } from 'domain/src/model/merchant/merchant.repository';

export class CreateMerchantService {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async save(merchant: MerchantEntity): Promise<MerchantEntity> {
    return await this.merchantRepository.save(merchant);
  }
}
