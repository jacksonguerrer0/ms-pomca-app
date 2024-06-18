import { FarmerPostEntity } from "./farmer-post.entity";

export interface IFarmerPostRepository {
  create(data: any): Promise<FarmerPostEntity>;
  update(id: number, data: any): Promise<FarmerPostEntity>;
  delete(id: number): Promise<FarmerPostEntity>;
  getById(id: number): Promise<FarmerPostEntity>;
  getAll(filter: any): Promise<FarmerPostEntity[]>;
}
