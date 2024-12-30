import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Country, Theme, User } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';

import { CountryService } from '@/country/country.service';
import { ThemeService } from '@/theme/theme.service';
import { IPreferences, IUserProfile } from '@/user/common/types';
import { UpdateUserProfileDTO } from '@/user/dto/update-user.dto';
import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class UserService {
  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly themeService: ThemeService,
    protected readonly countryService: CountryService,
    protected readonly i18nService: I18nService
  ) {}

  async findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async getPreferences(userId?: string): Promise<IPreferences> {
    if (!userId) return {};

    const currentUser = await this.findOne(userId);

    if (!currentUser) return {};

    const userTheme = await this.themeService.findOne(currentUser.themeId);
    const userCountry = await this.countryService.findOne(
      currentUser.countryId
    );

    return {
      theme: userTheme?.value,
      country: userCountry?.value,
    };
  }

  async switchTheme(themeName: string, userId: string): Promise<Theme> {
    const currentUser = await this.findOne(userId);

    if (!currentUser)
      throw new NotFoundException(this.i18nService.t('global.user-not-found'));

    const selectedTheme = await this.themeService.findByName(themeName);

    if (!selectedTheme) throw new NotFoundException('global.theme-not-found');

    const switchThemeOperation = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        themeId: selectedTheme?.id,
      },
    });

    if (!switchThemeOperation)
      throw new UnprocessableEntityException(
        this.i18nService.t('global.generic-error')
      );

    return selectedTheme;
  }

  async changeCountry(countryName: string, userId: string): Promise<Country> {
    const currentUser = await this.findOne(userId);

    if (!currentUser)
      throw new NotFoundException(this.i18nService.t('global.user-not-found'));

    const selectedCountry = await this.countryService.findByName(countryName);

    if (!selectedCountry)
      throw new NotFoundException(
        this.i18nService.t('global.country-not-found')
      );

    const changeCountryOperation = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        countryId: selectedCountry.id,
      },
    });

    if (!changeCountryOperation)
      throw new UnprocessableEntityException(
        this.i18nService.t('global.generic-error')
      );

    return selectedCountry;
  }

  async getProfile(userId: string): Promise<IUserProfile> {
    const currentUser = await this.findOne(userId);

    if (!currentUser)
      throw new NotFoundException(this.i18nService.t('global.user-not-found'));

    const currentTheme = await this.themeService.findOne(currentUser.themeId);

    if (!currentTheme)
      throw new NotFoundException(this.i18nService.t('global.theme-not-found'));

    const currentCountry = await this.countryService.findOne(
      currentUser.countryId
    );

    if (!currentCountry)
      throw new NotFoundException(
        this.i18nService.t('global.country-not-found')
      );

    return {
      email: currentUser.email,
      surname: currentUser.surname,
      name: currentUser.name,
      country: currentCountry.value,
      theme: currentTheme.value,
    };
  }

  async updateProfile(
    newUserProfile: UpdateUserProfileDTO,
    userId: string
  ): Promise<IUserProfile> {
    const currentUser = await this.findOne(userId);

    if (!currentUser)
      throw new NotFoundException(this.i18nService.t('global.user-not-found'));

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        name: newUserProfile.name,
        surname: newUserProfile.surname,
      },
    });

    if (!updatedUser)
      throw new UnprocessableEntityException(
        this.i18nService.t('global.generic-error')
      );

    return {
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      country: updatedUser.countryId,
      theme: updatedUser.themeId,
    };
  }
}
