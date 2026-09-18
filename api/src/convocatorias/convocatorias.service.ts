import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConvocatoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.convocatoria.findMany({
      where: { activa: true },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number) {
    const convocatoria = await this.prisma.convocatoria.findFirst({
      where: { id, activa: true },
    });
    if (!convocatoria) {
      throw new NotFoundException(`Convocatoria con id ${id} no encontrada`);
    }
    return convocatoria;
  }
}