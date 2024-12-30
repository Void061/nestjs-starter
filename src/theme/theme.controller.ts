import { Controller, Get } from '@nestjs/common';
import { Theme } from '@prisma/client';

import { ThemeService } from '@/theme/theme.service';

@Controller('themes')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  async findAll(): Promise<Theme[]> {
    return await this.themeService.findAll();
  }
}
