import { Injectable } from '@nestjs/common';
import { Theme } from '@prisma/client';

import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class ThemeService {
  constructor(protected readonly prismaService: PrismaService) {}

  async findAll(): Promise<Theme[]> {
    const retrivedThemes = await this.prismaService.theme.findMany();

    return retrivedThemes || [];
  }

  async findOne(id: string): Promise<Theme | null> {
    return this.prismaService.theme.findUnique({ where: { id } });
  }

  async findByName(themeName: string): Promise<Theme | null> {
    return this.prismaService.theme.findUnique({ where: { value: themeName } });
  }
}
