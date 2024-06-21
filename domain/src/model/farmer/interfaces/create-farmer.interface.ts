import { DocumentTypeEnum } from "../enums/document.enum";

export interface ICreateFarmer {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  photo_url: string;
  document_number: string;
  document_type: DocumentTypeEnum;
}
