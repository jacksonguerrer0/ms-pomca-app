import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { LambdaInvoker } from 'src/adapters/out/lambda/lambda-invoker';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(LambdaInvoker)
    private readonly lambdaInvoker: LambdaInvoker,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token || !this.validateToken(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  validateToken(token: string): Observable<boolean> {
    // change this to a real validation
    const dummyValidation = token === 'token_valido';

    if (dummyValidation) {
      return of(true);
    }

    this.lambdaInvoker
      .invokeLambda<boolean>(process.env.AWS_LAMBDA_AUTH_CHECK_NAME!, token)
      .subscribe({
        next: (response: any) => {
          if (response.body.isAuthenticated) {
            return true;
          }
          return false;
        },
        error: (err) => {
          console.error('Error invoking Lambda:', err);
          return false;
        },
      });
  }
}
