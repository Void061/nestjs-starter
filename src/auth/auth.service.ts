import { Injectable } from '@nestjs/common';

import { RegisterWithCredentialsDTO } from '@/auth/common/auth.dto';
import { PrismaService } from '@/utils/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async loginWithCredentials() {
    return {
      auth: 'Login with credentials',
    };
  }

  async registerWithCredentials(
    userData: RegisterWithCredentialsDTO
  ): Promise<boolean> {
    try {
      await this.prismaService.user.create({
        data: {
          name: userData.name,
          surname: userData.surname,
          password: userData.password,
          email: userData.email,
        },
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
