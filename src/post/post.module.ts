import { Module } from '@nestjs/common';

import { PostController } from '@/post/post.controller';
import { PostService } from '@/post/post.service';
import { PrismaService } from '@/utils/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
