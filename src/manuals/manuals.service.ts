import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManualDto } from './dto/create-manual.dto';
import { Manual, ManualDocument } from './schemas/manual.schema';

@Injectable()
export class ManualsService {
  constructor(@InjectModel(Manual.name) private model: Model<ManualDocument>) {}

  async findAll(): Promise<CreateManualDto[]> {
    return await this.model.find().exec();
  }

  async create(dto: CreateManualDto): Promise<CreateManualDto> {
    const createManual = new this.model(dto);

    return await createManual.save();
  }
}
