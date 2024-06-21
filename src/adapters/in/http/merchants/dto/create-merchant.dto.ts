import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateMerchant } from 'domain/src/model/merchant/interfaces/create-merchant.interface';

export class CreateMerchantDTO implements ICreateMerchant {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  legal_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  photo_url: string;

  @IsString()
  @IsNotEmpty()
  rut_document_url: string;
}
