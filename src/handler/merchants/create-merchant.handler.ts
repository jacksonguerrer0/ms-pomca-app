import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { CreateMerchantUseCase } from 'domain/src/usecase/merchant/create-merchant.usecase';
import { CreateMerchantDTO } from 'src/adapters/in/http/merchants/dto/create-merchant.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerCreateMerchant {
  constructor(
    @Inject(CreateMerchantUseCase)
    private readonly createMerchantUseCase: CreateMerchantUseCase,
  ) {}

  async execute(farmer: CreateMerchantDTO): Promise<HTTPResponse> {
    const newMerchant = plainToClass(MerchantEntity, farmer);
    const result = await this.createMerchantUseCase.apply(newMerchant);

    return new HTTPResponse(
      HttpStatusMapper.CREATED.status,
      'Merchant created successfully',
      result,
    );
  }
}
