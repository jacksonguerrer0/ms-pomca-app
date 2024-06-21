import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateMerchantPost } from 'domain/src/model/merchant-post/interfaces/create-merchant-post.interface';

export class CreateMerchantPostDTO implements ICreateMerchantPost {
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
  merchant_id: number;
}
