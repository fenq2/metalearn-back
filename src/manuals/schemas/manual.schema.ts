import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type ManualDocument = mongoose.HydratedDocument<Manual>;

@Schema()
export class Manual {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  upadtedAt: Date;

  @Prop({ required: true })
  image: string;

  @Prop()
  comments: [];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ManualSchema = SchemaFactory.createForClass(Manual);
