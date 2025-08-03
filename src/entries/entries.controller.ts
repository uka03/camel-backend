import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Role } from 'src/common/enums/role.enums';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Editor)
  @Post()
  async create(@User() user: any, @Body() createEntryDto: CreateEntryDto) {
    createEntryDto.authorId = user.id;
    let response = await this.entriesService.create(createEntryDto);
    return {
      data: response,
      message: 'Entry created successfully',
      status: 201,
    };
  }

  @Get()
  async findAll(
    @Query('page') pageStr: string,
    @Query('limit') limitStr: string,
    @Query('search') search: string,
  ) {
    let page = pageStr ? parseInt(pageStr, 10) : 1;
    let limit = limitStr ? parseInt(limitStr, 10) : 10;
    let response = await this.entriesService.findAll(page, limit, search);
    return {
      ...response,
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
