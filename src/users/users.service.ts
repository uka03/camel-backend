import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  // This service will handle user-related operations
  // For now, it is empty but can be expanded later
}
