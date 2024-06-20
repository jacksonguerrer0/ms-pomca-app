import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { CreateMerchantUseCase } from 'domain/src/usecase/merchant/create-merchant.usecase';
import { CreateMerchantDTO } from 'src/adapters/in/http/merchants/dto/create-merchant.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@Injectable()
export class HandlerCreateMerchant {
  constructor(
    @Inject(CreateMerchantUseCase)
    private readonly createMerchantUseCase: CreateMerchantUseCase,
  ) {}

  async execute(farmer: CreateMerchantDTO): Promise<HTTPResponse> {
    try {
      const newMerchant = plainToClass(MerchantEntity, farmer);
      const result = await this.createMerchantUseCase.apply(newMerchant);

      return new HTTPResponse(
        HttpStatus.CREATED,
        'CREATED',
        'Merchant created successfully',
        result,
      );
    } catch {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        'BAD_REQUEST',
        'Merchant could not be created',
      );
    }
  }
}
