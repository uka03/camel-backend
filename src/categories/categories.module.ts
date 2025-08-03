import { Module } from '@nestjs/common';
import { CategoriesController } from './catergories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
