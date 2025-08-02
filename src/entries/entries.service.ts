import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEntryDto } from './dto/create-entry.dto';

const prisma = new PrismaClient();

@Injectable()
export class EntriesService {
  create(createEntryDto: CreateEntryDto) {
    return prisma.entry.create({ data: createEntryDto });
  }

  findAll() {
    return prisma.entry.findMany();
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
