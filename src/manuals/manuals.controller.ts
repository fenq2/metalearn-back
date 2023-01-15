import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateManualDto } from './dto/create-manual.dto';
import { ManualsService } from './manuals.service';

@Controller('manuals')
export class ManualsController {
  constructor(private readonly manualsService: ManualsService) {}

  @Get()
  getManuals() {
    return this.manualsService.findAll();
  }

  @Post('create')
  create(@Body() dto: CreateManualDto) {
    return this.manualsService.create(dto);
  }
}
