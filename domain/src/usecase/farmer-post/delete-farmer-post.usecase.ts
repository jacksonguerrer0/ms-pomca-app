import { IFarmerPostRepository } from 'domain/src/model/farmer-post/farmer-post.repository';

export class DeleteFarmerPostUseCase {
  constructor(private farmerPostRepository: IFarmerPostRepository) {}

  async apply(id: number): Promise<boolean> {
    return await this.farmerPostRepository.delete(id);
  }
}
