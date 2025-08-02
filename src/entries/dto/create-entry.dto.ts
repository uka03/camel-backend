export class CreateEntryDto {
  title: string;
  category: string;
  year?: number;
  content: string;
  source?: string;
  location?: string;
}