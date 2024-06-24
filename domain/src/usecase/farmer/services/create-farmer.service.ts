import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { IFarmerRepository } from 'domain/src/model/farmer/farmer.repository';

export class CreateFarmerService {
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  async save(farmer: FarmerEntity): Promise<FarmerEntity> {
    return await this.farmerRepository.save(farmer);
  }
}
