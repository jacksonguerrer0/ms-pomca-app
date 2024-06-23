import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandlerCreateMerchant } from 'src/handler/merchants/create-merchant.handler';
import { HandlerGetAllMerchants } from 'src/handler/merchants/get-all-farmers.handler';
import { HandlerGetMerchantById } from 'src/handler/merchants/get-farmer-by-id.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { CreateMerchantDTO } from './dto/create-merchant.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Merchants')
@Controller('v1/merchants')
export class MerchantsController {
  constructor(
    private readonly handlerCreateMerchant: HandlerCreateMerchant,
    private readonly handlerGetAllMerchants: HandlerGetAllMerchants,
    private readonly handlerGetMerchantById: HandlerGetMerchantById,
  ) {}

  @Get()
  async findAll(
    @Query() filter: FilterPaginationDTO,
  ): Promise<HTTPPreResponse> {
    return await this.handlerGetAllMerchants.execute(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HTTPPreResponse> {
    return await this.handlerGetMerchantById.execute(id);
  }

  @Post()
  async create(@Body() request: CreateMerchantDTO): Promise<HTTPPreResponse> {
    return await this.handlerCreateMerchant.execute(request);
  }
}
