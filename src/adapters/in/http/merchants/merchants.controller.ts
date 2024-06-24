import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { HandlerGetAllMerchants } from 'src/handler/merchants/get-all-farmers.handler';
import { HandlerGetMerchantById } from 'src/handler/merchants/get-farmer-by-id.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CreateMerchantDTO } from './dto/create-merchant.dto';
import { HandlerSignupMerchant } from 'src/handler/merchants/signup-merchant.handler';

@UseGuards(AuthGuard)
@ApiTags('Merchants')
@Controller('v1/merchants')
export class MerchantsController {
  constructor(
    private readonly handlerSignupMerchant: HandlerSignupMerchant,
    private readonly handlerGetAllMerchants: HandlerGetAllMerchants,
    private readonly handlerGetMerchantById: HandlerGetMerchantById,
  ) {}

  @Get()
  async findAll(@Query() filter: FilterPaginationDTO): Promise<HTTPResponse> {
    return await this.handlerGetAllMerchants.execute(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HTTPResponse> {
    return await this.handlerGetMerchantById.execute(id);
  }

  @Post()
  async signup(@Body() request: CreateMerchantDTO): Promise<HTTPResponse> {
    return await this.handlerSignupMerchant.execute(request);
  }
}
