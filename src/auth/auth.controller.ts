import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@/auth/auth.decorator';
import { AuthService } from '@/auth/auth.service';
import {
  RegisterWithCredentialsDTO,
  UserPrincipalDTO,
} from '@/auth/common/auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.auth.guard';
import { BASE_AUTH_ROUTE, WITH_CREDENTIALS } from '@/auth/routes';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`${BASE_AUTH_ROUTE}/${WITH_CREDENTIALS.SIGNUP}`)
  @UseGuards(JwtAuthGuard)
  async storeUserOnDB(
    @CurrentUser() { sub: userId }: UserPrincipalDTO,
    @Body() userData: RegisterWithCredentialsDTO
  ) {
    return this.authService.storeUserOnDB(userData, userId);
  }
}
