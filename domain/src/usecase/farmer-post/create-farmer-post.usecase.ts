import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { IFarmerPostRepository } from 'domain/src/model/farmer-post/farmer-post.repository';

export class CreateFarmerPostUseCase {
  constructor(private readonly farmerPostRepository: IFarmerPostRepository) {}

  async apply(data: FarmerPostEntity): Promise<FarmerPostEntity> {
    return await this.farmerPostRepository.save(data);
  }
}
