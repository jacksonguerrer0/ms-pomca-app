import { FarmerEntity } from "./farmer.entity";

export interface IFarmerRepository {
  create(data: any): Promise<FarmerEntity>;
  getById(id: number): Promise<FarmerEntity>;
  getAll(filter: any): Promise<FarmerEntity[]>;
}
