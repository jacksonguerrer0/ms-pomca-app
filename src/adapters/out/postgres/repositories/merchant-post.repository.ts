import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IFilterOptions,
  IPaginatedResult,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { MerchantPostEntity } from 'domain/src/model/merchant-post/merchant-post.entity';
import { IMerchantPostRepository } from 'domain/src/model/merchant-post/merchant-post.repository';
import { Repository } from 'typeorm';
import {
  filterAndPaginate,
  filterOptions,
} from '../common/utils/filter_and_paginate.util';
import { MerchantPostEntitySchema } from '../entity-schemas/merchant-post.entity-schema';

@Injectable()
export class MerchantPostRepository implements IMerchantPostRepository {
  constructor(
    @InjectRepository(MerchantPostEntitySchema)
    private merchantPostRepository: Repository<MerchantPostEntity>,
  ) {}

  async save(data: MerchantPostEntity): Promise<MerchantPostEntity> {
    return await this.merchantPostRepository.save(data);
  }

  async delete(id: number): Promise<boolean> {
    const post = await this.getById(id);
    const result = await this.merchantPostRepository.delete(post.id);
    return result.affected > 0;
  }

  async getById(id: number): Promise<MerchantPostEntity> {
    const post = await this.merchantPostRepository.findOneBy({ id });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  async getAll(
    options: IFilterOptions,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<MerchantPostEntity>> {
    const findOptions = {
      ...(await filterOptions(options, MerchantPostEntity)),
    };

    return await filterAndPaginate<MerchantPostEntity>(
      this.merchantPostRepository,
      pagination,
      findOptions,
    );
  }
}
