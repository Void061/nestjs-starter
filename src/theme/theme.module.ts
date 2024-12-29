import { Module } from '@nestjs/common';

import { ThemeController } from '@/theme/theme.controller';
import { ThemeService } from '@/theme/theme.service';
import { PrismaService } from '@/utils/prisma.service';

@Module({
  controllers: [ThemeController],
  providers: [ThemeService, PrismaService],
})
export class ThemeModule {}
