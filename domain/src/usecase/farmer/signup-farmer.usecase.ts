import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { CreateFarmerService } from './services/create-farmer.service';

export class SignupFarmerUseCase {
  constructor(private createFarmerService: CreateFarmerService) {}

  async apply(data: FarmerEntity): Promise<FarmerEntity> {
    return this.createFarmerService.save(data);
  }
}
