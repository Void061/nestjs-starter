import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Country, Theme, User } from '@prisma/client';

import { CountryService } from '@/country/country.service';
import { ThemeService } from '@/theme/theme.service';
import { IPreferences } from '@/user/common/types';
import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class UserService {
  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly themeService: ThemeService,
    protected readonly countryService: CountryService
  ) {}

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

    if (!currentUser) throw new NotFoundException('User not found');

    const selectedTheme = await this.themeService.findByName(themeName);

    if (!selectedTheme) throw new NotFoundException('Theme not found');

    const switchThemeOperation = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        themeId: selectedTheme?.id,
      },
    });

    if (!switchThemeOperation)
      throw new UnprocessableEntityException('There was an error');

    return selectedTheme;
  }

  async changeCountry(countryName: string, userId: string): Promise<Country> {
    const currentUser = await this.findOne(userId);

    if (!currentUser) throw new NotFoundException('User not found');

    const selectedCountry = await this.countryService.findByName(countryName);

    if (!selectedCountry) throw new NotFoundException('Country not found');

    const changeCountryOperation = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        countryId: selectedCountry.id,
      },
    });

    if (!changeCountryOperation)
      throw new UnprocessableEntityException('There was an error');

    return selectedCountry;
  }

  async findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
