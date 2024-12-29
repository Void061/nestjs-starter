import { Module } from '@nestjs/common';

import { CountryService } from '@/country/country.service';
import { ThemeService } from '@/theme/theme.service';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/utils/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ThemeService, CountryService],
})
export class UserModule {}
