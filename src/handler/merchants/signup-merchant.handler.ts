import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { SignupMerchantUseCase } from 'domain/src/usecase/merchant/signup-merchant.usecase';
import { CreateMerchantDTO } from 'src/adapters/in/http/merchants/dto/create-merchant.dto';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@Injectable()
export class HandlerSignupMerchant {
  constructor(
    @Inject(SignupMerchantUseCase)
    private readonly signupMerchantUseCase: SignupMerchantUseCase,
  ) {}

  async execute(farmer: CreateMerchantDTO): Promise<HTTPResponse> {
    const newMerchant = plainToClass(MerchantEntity, farmer);
    const result = await this.signupMerchantUseCase.apply(newMerchant);

    return new HTTPResponse(
      HttpStatusMapper.CREATED.status,
      'Merchant created successfully',
      result,
    );
  }
}
