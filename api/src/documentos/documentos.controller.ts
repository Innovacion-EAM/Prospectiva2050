import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { QueryDocumentosDto } from './dto/query-documentos.dto';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get()
  findAll(@Query() query: QueryDocumentosDto) {
    return this.documentosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentosService.findOne(id);
  }
}