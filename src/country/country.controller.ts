import { Controller, Get } from '@nestjs/common';

import { Country } from '@prisma/client';

import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(): Promise<Country[]> {
    return await this.countryService.findAll();
  }
}
