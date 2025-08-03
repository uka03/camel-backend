import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CategoriesService {
  async create(name: string) {
    if (!name) {
      throw new Error('Category name is required');
    }
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });
    if (existingCategory) {
      throw new Error('Category already exists');
    }
    return prisma.category.create({ data: { name } });
  }

  async findAll() {
    return prisma.category.findMany();
  }

  findOne(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, name: string) {
    return prisma.category.update({
      where: { id },
      data: { name },
    });
  }
}
