import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
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

  validateToken(token: string): boolean {
    // ADD MS valitation with cognito
    return token === 'token_valido'; // Ejemplo simple
  }
}
