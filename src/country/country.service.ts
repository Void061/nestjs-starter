import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';

import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class CountryService {
  constructor(protected readonly prismaService: PrismaService) {}

  async findAll(): Promise<Country[]> {
    const retrivedCountries = await this.prismaService.country.findMany();

    return retrivedCountries || [];
  }

  async findByName(countryName: string): Promise<Country> {
    return this.prismaService.country.findUnique({
      where: { value: countryName },
    });
  }

  async findOne(id: string): Promise<Country | null> {
    return this.prismaService.country.findUnique({ where: { id } });
  }
}
