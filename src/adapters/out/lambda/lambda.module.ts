import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { LambdaInvoker } from './lambda-invoker';

@Module({
  providers: [AuthGuard, LambdaInvoker],
  exports: [AuthGuard, LambdaInvoker],
})
export class LambdaModule {}
