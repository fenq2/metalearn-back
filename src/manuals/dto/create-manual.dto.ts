import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/schemas/category.schema';

export class CreateManualDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  createdAt?: Date;

  upadtedAt?: Date;

  @IsNotEmpty()
  image: string;

  comments?: [];

  category?: Category;
}
