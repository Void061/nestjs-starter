import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common/decorators';

export const CurrentUser = createParamDecorator(
  (_data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  }
);
