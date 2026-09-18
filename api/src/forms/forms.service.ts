import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MensajeContactoDto } from './dto/mensaje-contacto.dto';
import { SugerenciaDto } from './dto/sugerencia.dto';
import { InscripcionTallerDto } from './dto/inscripcion-taller.dto';
import { SuscripcionBoletinDto } from './dto/suscripcion-boletin.dto';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  createContacto(dto: MensajeContactoDto) {
    return this.prisma.mensajeContacto.create({ data: dto });
  }

  createSugerencia(dto: SugerenciaDto) {
    return this.prisma.sugerencia.create({ data: dto });
  }

  createInscripcion(dto: InscripcionTallerDto) {
    return this.prisma.inscripcionTaller.create({ data: dto });
  }

  async createBoletin(dto: SuscripcionBoletinDto) {
    return this.prisma.suscripcionBoletin.upsert({
      where: { email: dto.email },
      update: { activo: true, ...(dto.nombre ? { nombre: dto.nombre } : {}) },
      create: dto,
    });
  }

  listContactos() {
    return this.prisma.mensajeContacto.findMany({ orderBy: { createdAt: 'desc' } });
  }

  listSugerencias() {
    return this.prisma.sugerencia.findMany({ orderBy: { createdAt: 'desc' } });
  }

  listInscripciones() {
    return this.prisma.inscripcionTaller.findMany({ orderBy: { createdAt: 'desc' } });
  }

  listBoletin() {
    return this.prisma.suscripcionBoletin.findMany({ orderBy: { createdAt: 'desc' } });
  }
}