import { IsNotEmpty } from 'class-validator';
import { Manual } from 'src/manuals/schemas/manual.schema';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  manuals?: Manual[];
}
