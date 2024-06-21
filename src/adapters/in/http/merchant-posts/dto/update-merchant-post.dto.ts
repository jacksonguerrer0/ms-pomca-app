import { IsArray, IsOptional, IsString } from 'class-validator';
import { IUpdateMerchantPost } from 'domain/src/model/merchant-post/interfaces/update-merchant-post.interface';

export class UpdateMerchantPostDTO implements IUpdateMerchantPost {
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
