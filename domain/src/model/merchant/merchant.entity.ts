export class MerchantEntity {
  constructor(
    public id: number,
    public name: string,
    public legal_name: string,
    public email: string,
    public phone_number: string,
    public photo_url: string,
    public rut_document_url: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
