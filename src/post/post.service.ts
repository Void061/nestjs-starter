import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';

import { CreatePostDto } from '@/post/dto/create-post.dto';
import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class PostService {
  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly i18nService: I18nService
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const createdPost = await this.prismaService.post.create({
      data: {
        userId,
        title: createPostDto.title,
      },
    });

    if (!createdPost)
      throw new UnprocessableEntityException(
        this.i18nService.t('global.generic-error')
      );

    return createdPost;
  }

  async findAll(): Promise<Post[]> {
    const retrivedPosts = await this.prismaService.post.findMany();

    return retrivedPosts || [];
  }
}
