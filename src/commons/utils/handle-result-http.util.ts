import { HTTPPreResponse } from 'src/model/http/pre-response';
import { HTTPResponse } from 'src/model/http/response';
import {
  HttpStatusMapper,
  HttpSuccesMapper,
} from 'src/model/mappers/http/http-status-mapper';

export function handleResultHttp(param: HTTPPreResponse): HTTPResponse {
  const result = HttpStatusMapper[param.code];
  const buildResponse = {
    status: result.status,
    code: param.code,
    message: param.message || result.message,
    data: param.data,
    metadata: param.metadata,
  };

  if (Object.keys(HttpSuccesMapper).includes(param.code)) {
    return new HTTPResponse(
      buildResponse.status,
      buildResponse.code,
      buildResponse.message,
      buildResponse.data,
      buildResponse.metadata,
    );
  }

  throw new HTTPResponse(
    buildResponse.status,
    buildResponse.code,
    buildResponse.message,
  );
}
