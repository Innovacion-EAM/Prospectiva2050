import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { QueryNoticiasDto } from './dto/query-noticias.dto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get()
  findAll(@Query() query: QueryNoticiasDto) {
    return this.noticiasService.findAll(query);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.noticiasService.findBySlug(slug);
  }
}