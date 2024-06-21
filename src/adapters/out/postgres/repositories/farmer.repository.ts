import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { FarmerEntity } from 'domain/src/model/farmer/farmer.entity';
import { IFarmerRepository } from 'domain/src/model/farmer/farmer.repository';
import { Repository } from 'typeorm';
import {
  filterAndPaginate,
  filterOptions,
} from '../common/utils/filter_and_paginate.util';
import { FarmerEntitySchema } from '../entity-schemas/farmer.entity-schema';

@Injectable()
export class FarmersRepository implements IFarmerRepository {
  constructor(
    @InjectRepository(FarmerEntitySchema)
    private farmerRepository: Repository<FarmerEntity>,
  ) {}

  async save(data: any): Promise<FarmerEntity> {
    return await this.farmerRepository.save(data);
  }
  async getById(id: number): Promise<FarmerEntity> {
    const farmer = await this.farmerRepository.findOneBy({ id });

    if (!farmer) {
      throw new Error(`Farmer with id: ${id} not found`);
    }

    return farmer;
  }
  async getAll(
    options: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<FarmerEntity>> {
    const findOptions = { ...(await filterOptions(options, FarmerEntity)) };
    return await filterAndPaginate<FarmerEntity>(
      this.farmerRepository,
      pagination,
      findOptions,
    );
  }
}
