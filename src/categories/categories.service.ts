import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private model: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<CreateCategoryDto[]> {
    return await this.model.find().populate('manuals').exec();
  }

  async findById(id): Promise<CreateCategoryDto> {
    return await this.model.findById(id).populate('manuals').exec();
  }

  async create(dto: CreateCategoryDto): Promise<CreateCategoryDto> {
    const createCategory = new this.model(dto);

    return await createCategory.save();
  }
}
