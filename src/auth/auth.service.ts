import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Role } from 'src/common/enums/role.enums';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: LoginDto) {
    let response = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!response) {
      return {
        message: 'Хэрэглэгч олдсонгүй',
        status: 404,
      };
    }
    if (response.password !== user.password) {
      return {
        message: 'Нууц үг буруу байна',
        status: 401,
      };
    }
    const token = this.jwtService.sign({
      id: response.id,
      email: response.email,
      roles: response.roles,
    });
    console.log('roles:', response.roles);
    return {
      user: {
        id: response.id,
        name: response.name,
        email: response.email,
        roles: response.roles,
        token,
      },
      message: 'Амжилттай нэвтэрлээ',
      status: 200,
    };
  }
  async register(createUserDto: CreateUserDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      return {
        message: 'Хэрэглэгчийн имэйл бүртгэлтэй байна',
        status: 400,
      };
    }
    createUserDto.roles = [Role.Reader];
    let response = await prisma.user.create({ data: createUserDto });
    return {
      data: response,
      message: 'Хэрэглэгч амжилттай бүртгэгдлээ',
      status: 201,
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
