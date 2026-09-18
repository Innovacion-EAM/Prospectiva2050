import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryDocumentosDto } from './dto/query-documentos.dto';

@Injectable()
export class DocumentosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDocumentosDto) {
    const { tipo, delimitacion, q } = query;
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;

    const where: any = {};

    if (tipo) {
      where.tipo = { equals: tipo, mode: 'insensitive' };
    }

    if (delimitacion) {
      where.delimitacion = { equals: delimitacion, mode: 'insensitive' };
    }

    if (q) {
      where.AND = [
        {
          OR: [
            { titulo: { contains: q, mode: 'insensitive' } },
            { autor: { contains: q, mode: 'insensitive' } },
          ],
        },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.documento.findMany({
        where,
        orderBy: { fecha: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.documento.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async findOne(id: number) {
    const documento = await this.prisma.documento.findUnique({ where: { id } });
    if (!documento) {
      throw new NotFoundException(`Documento con id ${id} no encontrado`);
    }
    return documento;
  }
}