import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { IFarmerRepository } from 'domain/src/model/farmer/farmer.repository';

export class GetFarmerByIdUseCase {
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  async apply(id: number): Promise<FarmerEntity> {
    return await this.farmerRepository.getById(id);
  }
}
