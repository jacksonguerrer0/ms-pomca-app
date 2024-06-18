import { MerchantEntity } from './merchant.entity';

export interface IMerchantRepository {
  create(data: any): Promise<MerchantEntity>;
  getById(id: number): Promise<MerchantEntity>;
  getAll(filter: any): Promise<MerchantEntity[]>;
}
