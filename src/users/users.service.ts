import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Role } from 'src/common/enums/role.enums';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        roles: true,
        createdAt: true,
      },
    });

    if (!user) {
      return {
        message: 'Хэрэглэгч олдсонгүй',
        status: 404,
      };
    }

    return {
      data: user,
      message: 'Хэрэглэгчийн мэдээлэл амжилттай авлаа',
      status: 200,
    };
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return {
        message: 'Хэрэглэгч олдсонгүй',
        status: 404,
      };
    }
    return {
      data: user,
      message: 'Хэрэглэгчийн мэдээлэл амжилттай авлаа',
      status: 200,
    };
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        roles: true,
        createdAt: true,
      },
    });

    return {
      data: users,
      message: 'Бүх хэрэглэгчийн мэдээлэл амжилттай авлаа',
      status: 200,
    };
  }

  async changeRole(id: string, roles: Role[]) {
    const user = await prisma.user.update({
      where: { id },
      data: { roles: roles },
    });
    if (!user) {
      return {
        message: 'Хэрэглэгч олдсонгүй',
        status: 404,
      };
    }
    return {
      data: user,
      message: 'Хэрэглэгчийн үүрэг амжилттай өөрчлөгдлөө',
      status: 200,
    };
  }
}
