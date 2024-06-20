import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import {
  IFilterOptions,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';

export class FilterPaginationDTO implements IFilterOptions, IPaginationOptions {
  @IsOptional()
  @IsString({ each: true })
  filters?: string[];

  @IsOptional()
  @IsString({ each: true })
  values?: any[];

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pageSize?: number;
}
