import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorEntity } from 'domain/src/model/author/author.entity';
import { HandlerGetAuthor } from 'src/handler/author/get-author-handler';

@ApiTags('Author')
@Controller('v1/author')
export class AuthorController {
  constructor(private handlerGetAuthor: HandlerGetAuthor) {}

  @Get('/')
  @ApiOperation({ summary: 'Get author' })
  @HttpCode(200)
  async getAuthor(): Promise<AuthorEntity> {
    return this.handlerGetAuthor.execute();
  }
}
