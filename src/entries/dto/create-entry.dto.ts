// src/entries/dto/create-entry.dto.ts
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  authorId: string; // гадаад түлхүүр
}
