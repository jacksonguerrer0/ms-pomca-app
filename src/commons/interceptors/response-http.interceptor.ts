import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HTTPPreResponse } from 'src/model/http/pre-response';
import { handleResultHttp } from '../utils/handle-result-http.util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data: HTTPPreResponse) => {
        const dataResponse = handleResultHttp(data);
        const statusCode =
          dataResponse.status || response.statusCode || HttpStatus.OK;
        response.status(statusCode).json({
          ...dataResponse,
          timestamp: new Date().toISOString(),
          data: dataResponse.data || {},
        });
      }),
      catchError((err: HTTPPreResponse) => {
        const dataResponse = handleResultHttp(err);
        const status =
          dataResponse instanceof HTTPPreResponse
            ? dataResponse.status
            : HttpStatus.INTERNAL_SERVER_ERROR;
        return throwError(
          () =>
            new HttpException(
              {
                status: status,
                code: dataResponse.code || 'INTERNAL_SERVER_ERROR',
                message: dataResponse.message || 'Internal server error',
                timestamp: new Date().toISOString(),
              },
              status,
            ),
        );
      }),
    );
  }
}
