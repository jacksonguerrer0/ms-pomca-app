import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { CreateMerchantUseCase } from 'domain/src/usecase/merchant/create-merchant.usecase';
import { CreateMerchantDTO } from 'src/adapters/in/http/merchants/dto/create-merchant.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerCreateMerchant {
  constructor(
    @Inject(CreateMerchantUseCase)
    private readonly createMerchantUseCase: CreateMerchantUseCase,
  ) {}

  async execute(farmer: CreateMerchantDTO): Promise<HTTPPreResponse> {
    try {
      const newMerchant = plainToClass(MerchantEntity, farmer);
      const result = await this.createMerchantUseCase.apply(newMerchant);

      return new HTTPPreResponse(
        HttpStatusMapper.CREATED.code,
        'Merchant created successfully',
        result,
      );
    } catch {
      return new HTTPPreResponse(
        HttpStatusMapper.BAD_REQUEST.code,
        'Merchant could not be created',
      );
    }
  }
}
