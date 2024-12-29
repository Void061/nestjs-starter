import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

import { Observable } from 'rxjs';

import { JwtAuthGuard } from '@/auth/guards/jwt.auth.guard';

@Injectable()
export class OptionalJwtAuthGuard extends JwtAuthGuard {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      return super.canActivate(context);
    } catch (error) {
      if (error instanceof Error) return true;
    }
  }

  handleRequest(err, user, info) {
    if (err || info || !user) {
      return null;
    }
    return user;
  }
}
