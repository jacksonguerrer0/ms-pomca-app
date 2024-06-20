import { DocumentTypeEnum } from "./enums/document.enum";

export class FarmerEntity {
  constructor(
    public id: number,
    public name: string,
    public last_name: string,
    public email: string,
    public phone_number: string,
    public photo_url: string,
    public document_number: string,
    public document_type: DocumentTypeEnum,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
