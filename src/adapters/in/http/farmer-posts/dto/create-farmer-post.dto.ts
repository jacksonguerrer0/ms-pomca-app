import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateFarmerPost } from 'domain/src/model/farmer-post/interfaces/create-farmer-post.interface';

export class CreateFarmerPostDTO implements ICreateFarmerPost {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  farmer_id: number;
}
