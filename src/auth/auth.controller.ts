import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { RegisterWithCredentialsDTO } from '@/auth/common/auth.dto';
import { BASE_AUTH_ROUTE, WITH_CREDENTIALS } from '@/auth/routes';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(`${BASE_AUTH_ROUTE}/${WITH_CREDENTIALS.LOGIN}`)
  async loginWithCredentials() {
    return this.authService.loginWithCredentials();
  }

  @Post(`${BASE_AUTH_ROUTE}/${WITH_CREDENTIALS.REGISTER}`)
  async registerWithCredentials(@Body() userData: RegisterWithCredentialsDTO) {
    return this.authService.registerWithCredentials(userData);
  }
}
