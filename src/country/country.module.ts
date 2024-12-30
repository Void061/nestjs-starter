import { Module } from '@nestjs/common';

import { CountryController } from '@/country/country.controller';
import { CountryService } from '@/country/country.service';
import { PrismaService } from '@/utils/prisma.service';

@Module({
  controllers: [CountryController],
  providers: [CountryService, PrismaService],
  exports: [CountryService],
})
export class CountryModule {}
