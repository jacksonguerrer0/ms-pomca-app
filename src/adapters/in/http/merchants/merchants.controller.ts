import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandlerCreateMerchant } from 'src/handler/merchants/create-merchant.handler';
import { HandlerGetAllMerchants } from 'src/handler/merchants/get-all-farmers.handler';
import { HandlerGetMerchantById } from 'src/handler/merchants/get-farmer-by-id.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CreateMerchantDTO } from './dto/create-merchant.dto';

@ApiTags('Merchants')
@Controller('v1/merchants')
export class MerchantsController {
  constructor(
    private readonly handlerCreateMerchant: HandlerCreateMerchant,
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
  async create(@Body() request: CreateMerchantDTO): Promise<HTTPResponse> {
    return await this.handlerCreateMerchant.execute(request);
  }
}
