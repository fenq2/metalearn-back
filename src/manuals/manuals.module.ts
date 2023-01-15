import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManualsController } from './manuals.controller';
import { ManualsService } from './manuals.service';
import { Manual, ManualSchema } from './schemas/manual.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manual.name, schema: ManualSchema }]),
  ],
  controllers: [ManualsController],
  providers: [ManualsService],
})
export class ManualsModule {}
