import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const authHeader = context.getArgs()[2].req?.headers
      .authorization as string;

    console.log('authHeader', authHeader);

    if (!authHeader) {
      throw new HttpException('Token not Found', HttpStatus.NOT_FOUND);
    }

    const token = authHeader.split(' ')[1];
    console.log('token', token);
    const isTokenValid = this.authService.validateToken(token);

    console.log('isTokenValid', isTokenValid);
    if (isTokenValid === 'TokenExpiredError') {
      throw new HttpException('Token is Expired', HttpStatus.BAD_REQUEST);
    }

    const user = this.authService.getUserFromAccessToken(token);
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
