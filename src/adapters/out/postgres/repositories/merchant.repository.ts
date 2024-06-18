import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { MerchantEntity } from 'domain/src/model/merchant/merchant.entity';
import { IMerchantRepository } from 'domain/src/model/merchant/merchant.repository';
import { Repository } from 'typeorm';
import {
  filterAndPaginate,
  filterOptions,
} from '../common/utils/filter_and_paginate.util';
import { MerchantEntitySchema } from '../entity-schemas/merchant.entity-schema';

@Injectable()
export class MerchantRepository implements IMerchantRepository {
  constructor(
    @InjectRepository(MerchantEntitySchema)
    private readonly merchantRepository: Repository<MerchantEntity>,
  ) {}

  async save(data: MerchantEntity): Promise<MerchantEntity> {
    return await this.merchantRepository.save(data);
  }
  async getById(id: number): Promise<MerchantEntity> {
    return await this.merchantRepository.findOneBy({ id });
  }
  async getAll(
    options: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<MerchantEntity>> {
    const findOptions = {...await filterOptions(options, MerchantEntity)};

    return await filterAndPaginate<MerchantEntity>(
      this.merchantRepository,
      pagination,
      findOptions,
    );
  }
}
