import { MerchantPostEntity } from './merchant-post.entity';

export interface IFarmerPostRepository {
  create(data: any): Promise<MerchantPostEntity>;
  update(id: number, data: any): Promise<MerchantPostEntity>;
  delete(id: number): Promise<MerchantPostEntity>;
  getById(id: number): Promise<MerchantPostEntity>;
  getAll(filter: any): Promise<MerchantPostEntity[]>;
}
