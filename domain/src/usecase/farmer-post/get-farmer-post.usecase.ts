import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { IFarmerPostRepository } from 'domain/src/model/farmer-post/farmer-post.repository';

export class GetFarmerPostUseCase {
  constructor(private readonly farmerPostRepository: IFarmerPostRepository) {}

  async apply(id: number): Promise<FarmerPostEntity> {
    return await this.farmerPostRepository.getById(id);
  }
}
