import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConvocatoriasService } from './convocatorias.service';

@Controller('convocatorias')
export class ConvocatoriasController {
  constructor(private readonly convocatoriasService: ConvocatoriasService) {}

  @Get()
  findAll() {
    return this.convocatoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.convocatoriasService.findOne(id);
  }
}