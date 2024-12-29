import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { RegisterWithCredentialsDTO } from '@/auth/common/auth.dto';
import { KNOWN_ERRORS } from '@/common/constants';
import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

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
      throw new NotFoundException(KNOWN_ERRORS.COUNTRY_NOT_FOUND);

    const selectedTheme = await this.prismaService.theme.findFirst({
      where: {
        value: userData.theme,
      },
    });

    if (!selectedTheme)
      throw new NotFoundException(KNOWN_ERRORS.THEME_NOT_FOUND);

    const userExists = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (userExists || userId !== userData.id)
      throw new UnprocessableEntityException(
        KNOWN_ERRORS.USER_ALREADY_REGISTERED
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
      throw new UnprocessableEntityException(KNOWN_ERRORS.GENERIC_ERROR);

    return true;
  }
}
