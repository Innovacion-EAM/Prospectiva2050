import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FormsService } from './forms.service';
import { MensajeContactoDto } from './dto/mensaje-contacto.dto';
import { SugerenciaDto } from './dto/sugerencia.dto';
import { InscripcionTallerDto } from './dto/inscripcion-taller.dto';
import { SuscripcionBoletinDto } from './dto/suscripcion-boletin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contacto')
  contacto(@Body() dto: MensajeContactoDto) {
    return this.formsService.createContacto(dto);
  }

  @Post('sugerencias')
  sugerencias(@Body() dto: SugerenciaDto) {
    return this.formsService.createSugerencia(dto);
  }

  @Post('inscripciones')
  inscripciones(@Body() dto: InscripcionTallerDto) {
    return this.formsService.createInscripcion(dto);
  }

  @Post('boletin')
  boletin(@Body() dto: SuscripcionBoletinDto) {
    return this.formsService.createBoletin(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  all() {
    return {
      contactos: this.formsService.listContactos(),
      sugerencias: this.formsService.listSugerencias(),
      inscripciones: this.formsService.listInscripciones(),
      boletin: this.formsService.listBoletin(),
    };
  }
}