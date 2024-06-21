import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HandlerGetAuthor } from 'src/handler/author/get-author-handler';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@ApiTags('Author')
@Controller('v1/author')
export class AuthorController {
  constructor(private handlerGetAuthor: HandlerGetAuthor) {}

  @Get('/')
  @ApiOperation({ summary: 'Get author' })
  @HttpCode(200)
  async getAuthor(): Promise<HTTPPreResponse> {
    try {
      const result = await this.handlerGetAuthor.execute();
      return new HTTPPreResponse(
        HttpStatusMapper.OK.code,
        HttpStatusMapper.OK.message,
        result,
      );
    } catch (error) {
      return new HTTPPreResponse(
        HttpStatusMapper.INTERNAL_SERVER_ERROR.code,
        'Error getting author',
      );
    }
  }
}
