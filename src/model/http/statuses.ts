import { HttpStatus } from '@nestjs/common';

type TResponse = {
  status: number;
  code: string;
  message: string;
};
type TTypeResponse = 'success' | 'failure';
type TDetailResponse = Record<TTypeResponse, TResponse>;

export const CODE_MESSAGE_RESPONSE: TDetailResponse = {
  success: {
    status: HttpStatus.OK,
    code: 'OK',
    message: 'The request has succeeded.',
  },
  failure: {
    status: HttpStatus.BAD_REQUEST,
    code: 'BAD',
    message: 'The request could not be understood by the server.',
  },
};
