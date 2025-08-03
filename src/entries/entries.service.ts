import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateEntryDto } from './dto/create-entry.dto';

const prisma = new PrismaClient();

@Injectable()
export class EntriesService {
  create(createEntryDto: CreateEntryDto) {
    return prisma.entry.create({ data: createEntryDto });
  }

  async findAll(page: number, take: number, text?: string) {
    const skip = (page - 1) * take;

    const where: Prisma.EntryWhereInput = text
      ? {
          OR: [
            { title: { contains: text, mode: Prisma.QueryMode.insensitive } },
            { content: { contains: text, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.entry.findMany({
        where,
        skip,
        take,
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
        },
      }),
      prisma.entry.count({ where }), // 👈 зөв count
    ]);

    return {
      data,
      pagination: {
        page,
        limit: take,
        total,
      },
      message: 'Entries retrieved successfully',
      status: 200,
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
