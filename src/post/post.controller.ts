import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { Post as PrismaPost } from '@prisma/client';

import { CurrentUser } from '@/auth/auth.decorator';
import { UserPrincipalDTO } from '@/auth/common/auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.auth.guard';
import { CreatePostDto } from '@/post/dto/create-post.dto';
import { PostService } from '@/post/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() { sub: userId }: UserPrincipalDTO,
    @Body() createPostDto: CreatePostDto
  ): Promise<PrismaPost> {
    return this.postService.create(createPostDto, userId);
  }

  @Get()
  async findAll(): Promise<PrismaPost[]> {
    return await this.postService.findAll();
  }
}
