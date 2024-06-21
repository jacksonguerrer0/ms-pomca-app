import { IsArray, IsOptional, IsString } from 'class-validator';
import { IUpdateFarmerPost } from 'domain/src/model/farmer-post/interfaces/update-farmer-post.interface';

export class UpdateFarmerPostDTO implements IUpdateFarmerPost {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
