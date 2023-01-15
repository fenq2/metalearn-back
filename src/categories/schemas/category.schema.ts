import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Manual } from 'src/manuals/schemas/manual.schema';

export type CategoryDocument = mongoose.HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manual' }] })
  manuals: Manual[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
