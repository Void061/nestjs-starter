import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { Post } from '@prisma/client';

import { KNOWN_ERRORS } from '@/common/constants';
import { CreatePostDto } from '@/post/dto/create-post.dto';
import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class PostService {
  constructor(protected readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const createdPost = await this.prismaService.post.create({
      data: {
        userId,
        title: createPostDto.title,
      },
    });

    if (!createdPost)
      throw new UnprocessableEntityException(
        KNOWN_ERRORS.UNABLE_TO_CREATE_POST
      );

    return createdPost;
  }

  async findAll(): Promise<Post[]> {
    const retrivedPosts = await this.prismaService.post.findMany();

    return retrivedPosts || [];
  }
}
