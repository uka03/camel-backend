import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEntryDto } from './dto/create-entry.dto';

const prisma = new PrismaClient();

@Injectable()
export class EntriesService {
  create(createEntryDto: CreateEntryDto) {
    return prisma.entry.create({ data: createEntryDto });
  }

  async findAll(page: number, take: number) {
    const skip = (page - 1) * take;

    const [data, total] = await Promise.all([
      prisma.entry.findMany({
        skip,
        take,
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
        },
      }),
      prisma.entry.count(),
    ]);

    return {
      data,
      pagination: {
        page,
        limit: take,
        total,
      },
    };
  }

  findOne(id: string) {
    return prisma.entry.findUnique({ where: { id } });
  }
  update(id: string, createEntryDto: CreateEntryDto) {
    return prisma.entry.update({
      where: { id },
      data: createEntryDto,
    });
  }
}
