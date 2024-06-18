import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { FarmerPostEntity } from 'domain/src/model/farmer-post/farmer-post.entity';
import { IFarmerPostRepository } from 'domain/src/model/farmer-post/farmer-post.repository';
import { Repository } from 'typeorm';
import {
  filterAndPaginate,
  filterOptions,
} from '../common/utils/filter_and_paginate.util';
import { FarmerPostEntitySchema } from '../entity-schemas/farmer-post.entity-schema';

@Injectable()
export class FarmerPostRepository implements IFarmerPostRepository {
  constructor(
    @InjectRepository(FarmerPostEntitySchema)
    private farmerPostRepository: Repository<FarmerPostEntity>,
  ) {}

  async save(data: FarmerPostEntity): Promise<FarmerPostEntity> {
    return await this.farmerPostRepository.save(data);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.farmerPostRepository.delete(id);
    return result.affected > 0;
  }

  async getById(id: number): Promise<FarmerPostEntity> {
    return await this.farmerPostRepository.findOneBy({ id });
  }

  async getAll(
    options: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<FarmerPostEntity>> {
    const findOptions = { ...(await filterOptions(options, FarmerPostEntity)) };

    return await filterAndPaginate<FarmerPostEntity>(
      this.farmerPostRepository,
      pagination,
      findOptions,
    );
  }
}
