import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HandlerGetAuthor } from 'src/handler/author/get-author-handler';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@ApiTags('Author')
@Controller('v1/author')
export class AuthorController {
  constructor(private handlerGetAuthor: HandlerGetAuthor) {}

  @Get('/')
  @ApiOperation({ summary: 'Get author' })
  @HttpCode(200)
  async getAuthor(): Promise<HTTPResponse> {
    try {
      const result = await this.handlerGetAuthor.execute();
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        CODE_MESSAGE_RESPONSE.success.code,
        CODE_MESSAGE_RESPONSE.success.message,
        result,
      );
    } catch (error) {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.failure.status,
        CODE_MESSAGE_RESPONSE.failure.code,
        'Error getting author',
      );
    }
  }
}
