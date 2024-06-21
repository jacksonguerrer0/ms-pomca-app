import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HandlerCreateFarmer } from 'src/handler/farmers/create-farmer.handler';
import { HandlerGetAllFarmers } from 'src/handler/farmers/get-all-farmers.handler';
import { HandlerGetFarmerById } from 'src/handler/farmers/get-farmer-by-id.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';
import { CreateFarmerDTO } from './dto/create-farmer.dto';
import { query } from 'express';

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
  async create(@Body() request: CreateFarmerDTO): Promise<HTTPResponse> {
    return await this.handlerCreateFarmer.execute(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farmer by id' })
  async getById(@Param('id') id: number): Promise<HTTPResponse> {
    return await this.handlerGetFarmerById.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all farmer' })
  async getAll(@Query() query: FilterPaginationDTO): Promise<HTTPResponse> {
    return await this.handlerGetAllFarmers.execute(query);
  }
}
