import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { CreateMerchantService } from './services/create-merchant.service';

export class SignupMerchantUseCase {
  constructor(private createMerchantService: CreateMerchantService) {}

  async apply(data: MerchantEntity): Promise<MerchantEntity> {
    return this.createMerchantService.save(data);
  }
}
