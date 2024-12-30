import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { I18nService } from 'nestjs-i18n';

import { RegisterWithCredentialsDTO } from '@/auth/common/auth.dto';
import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    protected readonly i18nService: I18nService
  ) {}

  async storeUserOnDB(
    userData: RegisterWithCredentialsDTO,
    userId: string
  ): Promise<boolean> {
    const selectedCountry = await this.prismaService.country.findFirst({
      where: {
        value: userData.country,
      },
    });

    if (!selectedCountry)
      throw new NotFoundException(
        this.i18nService.t('global.country-not-found')
      );

    const selectedTheme = await this.prismaService.theme.findFirst({
      where: {
        value: userData.theme,
      },
    });

    if (!selectedTheme)
      throw new NotFoundException(this.i18nService.t('global.theme-not-found'));

    const userExists = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (userExists || userId !== userData.id)
      throw new UnprocessableEntityException(
        this.i18nService.t('global.user-already-registered')
      );

    const create = await this.prismaService.user.create({
      data: {
        id: userId,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        countryId: selectedCountry.id,
        themeId: selectedTheme.id,
      },
    });

    if (!create)
      throw new UnprocessableEntityException(
        this.i18nService.t('global.generic-error')
      );

    return true;
  }
}
