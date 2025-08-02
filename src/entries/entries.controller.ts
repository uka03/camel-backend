import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  async create(@Body() createEntryDto: CreateEntryDto) {
    let response = await this.entriesService.create(createEntryDto);
    return {
      data: response,
      message: 'Entry created successfully',
      status: 201,
    };
  }

  @Get()
  async findAll() {
    let response = await this.entriesService.findAll();
    return {
      data: response,
      message: 'Entries retrieved successfully',
      status: 200,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) {
      return {
        message: 'ID is required',
        status: 400,
      };
    }
    let response = await this.entriesService.findOne(id);
    return {
      data: response,
      message: 'Entry retrieved successfully',
      status: 200,
    };
  }
  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() createEntryDto: CreateEntryDto,
  ) {
    if (!id) {
      return {
        message: 'ID is required',
        status: 400,
      };
    }
    let response = await this.entriesService.update(id, createEntryDto);
    return {
      data: response,
      message: 'Entry updated successfully',
      status: 200,
    };
  }
}
