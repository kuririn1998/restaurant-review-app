import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class JwtGuardRole implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== 'admin') {
      throw new ForbiddenException('この操作は管理者のみが許可されています。');
    }
    return true;
  }
}
