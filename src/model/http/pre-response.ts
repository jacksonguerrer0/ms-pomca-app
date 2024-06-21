export class HTTPPreResponse<T = any> {
  constructor(
    public readonly code: string,
    public readonly message?: string,
    public readonly data?: T,
    public readonly metadata?: any,
  ) {}
}
