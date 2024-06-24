import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { HandlerSignupFarmer } from 'src/handler/farmers/create-farmer.handler';
import { HandlerGetAllFarmers } from 'src/handler/farmers/get-all-farmers.handler';
import { HandlerGetFarmerById } from 'src/handler/farmers/get-farmer-by-id.handler';
import { FilterPaginationDTO } from 'src/model/dtos/filter-pagination/filter-pagination.dto';
import { HTTPResponse } from 'src/model/http/response';
import { CreateFarmerDTO } from './dto/create-farmer.dto';

@UseGuards(AuthGuard)
@ApiTags('Farmers')
@Controller('v1/farmers')
export class FarmersController {
  constructor(
    private handlerSignUpFarmer: HandlerSignupFarmer,
    private handlerGetFarmerById: HandlerGetFarmerById,
    private handlerGetAllFarmers: HandlerGetAllFarmers,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Signup a farmer' })
  async signup(@Body() request: CreateFarmerDTO): Promise<HTTPResponse> {
    return await this.handlerSignUpFarmer.execute(request);
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
