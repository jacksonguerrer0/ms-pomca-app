export class MerchantPostEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public merchant_id: string,
    public images: string[],
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
