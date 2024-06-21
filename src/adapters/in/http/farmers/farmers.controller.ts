import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HandlerCreateFarmer } from 'src/handler/farmers/create-farmer.handler';
import { HandlerGetAllFarmers } from 'src/handler/farmers/get-all-farmers.handler';
import { HandlerGetFarmerById } from 'src/handler/farmers/get-farmer-by-id.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { CreateFarmerDTO } from './dto/create-farmer.dto';

@ApiTags('Farmers')
@Controller('v1/farmers')
export class FarmersController {
  constructor(
    private handlerCreateFarmer: HandlerCreateFarmer,
    private handlerGetFarmerById: HandlerGetFarmerById,
    private handlerGetAllFarmers: HandlerGetAllFarmers,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a farmer' })
  async create(@Body() request: CreateFarmerDTO): Promise<HTTPPreResponse> {
    return await this.handlerCreateFarmer.execute(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farmer by id' })
  async getById(@Param('id') id: number): Promise<HTTPPreResponse> {
    return await this.handlerGetFarmerById.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all farmer' })
  async getAll(@Query() query: FilterPaginationDTO): Promise<HTTPPreResponse> {
    return await this.handlerGetAllFarmers.execute(query);
  }
}
