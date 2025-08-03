import { IsString, IsOptional, IsInt } from 'class-validator';
import { UserResponseDto } from 'src/auth/dto/user.dto';
export class CreateEntryDto {
  @IsString()
  title: string;

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
  authorId: string;

  @IsString()
  categoryId: string;
}

export class EntryResponseDto {
  id: string;
  authorId: string;
  title: string;
  content: string;
  year?: number;
  source?: string;
  location?: string;
  categoryId?: string | null;
  category?: string | null;
  createdAt: Date;
  author: UserResponseDto;
}
