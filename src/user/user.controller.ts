import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Theme } from '@prisma/client';

import { CurrentUser } from '@/auth/auth.decorator';
import { UserPrincipalDTO } from '@/auth/common/auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.auth.guard';
import { OptionalJwtAuthGuard } from '@/auth/guards/optionalJwt.auth.guard';
import { IPreferences, IUserProfile } from '@/user/common/types';
import {
  ChangeCountryDTO,
  SwitchThemeDTO,
  UpdateUserProfileDTO,
} from '@/user/dto/update-user.dto';
import { UserService } from '@/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(
    @CurrentUser() { sub: userId }: UserPrincipalDTO
  ): Promise<IUserProfile> {
    return await this.userService.getProfile(userId);
  }

  @Get('preferences')
  @UseGuards(OptionalJwtAuthGuard)
  async getPreferences(
    @CurrentUser() user: UserPrincipalDTO
  ): Promise<IPreferences> {
    return await this.userService.getPreferences(user?.sub);
  }

  @Patch('switch-theme')
  @UseGuards(JwtAuthGuard)
  async switchTheme(
    @Body() params: SwitchThemeDTO,
    @CurrentUser() { sub: userId }: UserPrincipalDTO
  ): Promise<Theme> {
    return await this.userService.switchTheme(params.themeName, userId);
  }

  @Patch('change-country')
  @UseGuards(JwtAuthGuard)
  async changeCountry(
    @Body() params: ChangeCountryDTO,
    @CurrentUser() { sub: userId }: UserPrincipalDTO
  ) {
    return await this.userService.changeCountry(params.countryName, userId);
  }

  @Patch('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Body() params: UpdateUserProfileDTO,
    @CurrentUser() { sub: userId }: UserPrincipalDTO
  ): Promise<IUserProfile> {
    return await this.userService.updateProfile(params, userId);
  }
}
