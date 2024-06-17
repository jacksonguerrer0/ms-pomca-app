import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HandlerGetServerHealth } from 'src/handler/health/get-server-health.handler';
import { HTTPResponse } from 'src/model/http/response';
import { CODE_MESSAGE_RESPONSE } from 'src/model/http/statuses';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private handlerGetServerHealth: HandlerGetServerHealth) {}

  @Get('/')
  @ApiOperation({ summary: 'Get server health' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Server is running' })
  @ApiResponse({ status: 500, description: 'Server is down' })
  async getServerHealth(): Promise<HTTPResponse<string>> {
    try {
      const result = this.handlerGetServerHealth.execute();
      if (result) throw new Error('Server is down');

      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        CODE_MESSAGE_RESPONSE.success.code,
        'Server is running',
      );
    } catch (error) {
      return new HTTPResponse(
        CODE_MESSAGE_RESPONSE.success.status,
        CODE_MESSAGE_RESPONSE.success.code,
        error.message,
      );
    }
  }
}
