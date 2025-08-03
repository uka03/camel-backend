import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body('name') name: string) {
    const category = await this.categoriesService.create(name);
    return {
      data: category,
      message: 'Category created successfully',
      status: 201,
    };
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return {
      data: categories,
      message: 'Categories retrieved successfully',
      status: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post(':id')
  async findOne(@Param('id') id: string, @Body('name') name: string) {
    if (!id) {
      return {
        message: 'ID is required',
        status: 400,
      };
    }
    const category = await this.categoriesService.update(id, name);
    return {
      data: category,
      message: 'Category retrieved successfully',
      status: 200,
    };
  }
}
