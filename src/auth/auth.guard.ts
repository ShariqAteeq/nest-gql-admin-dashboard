import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/helpers/constant';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    const authHeader = context.getArgs()[2].req.headers.authorization as string;
    const token = authHeader.split(' ')[1];

    if (!token && !requiredRoles) {
      return true;
    }

    const isTokenValid = this.authService.validateToken(token);
    if (!isTokenValid) {
      throw new HttpException('Token is Expired', HttpStatus.BAD_REQUEST);
    }

    const user = this.authService.getUserFromAccessToken(token);
    const ctx = GqlExecutionContext.create(context);
    console.log('user', ctx.getContext().req.user);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
