import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DocumentTypeEnum } from 'domain/src/model/farmer/enums/document.enum';
import { ICreateFarmer } from 'domain/src/model/farmer/interfaces/create-farmer.interface';

// TODO: Improve de swagger doc using @ApiProperty(type, description, example, ...)
export class CreateFarmerDTO implements ICreateFarmer {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

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
  document_number: string;

  @IsEnum(DocumentTypeEnum)
  @IsNotEmpty()
  document_type: DocumentTypeEnum;
}
