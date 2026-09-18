import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryNoticiasDto } from './dto/query-noticias.dto';

@Injectable()
export class NoticiasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryNoticiasDto) {
    const { categoria, q } = query;
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;

    const where: any = { publicado: true };

    if (categoria) {
      where.categoria = { equals: categoria, mode: 'insensitive' };
    }

    if (q) {
      where.AND = [
        {
          OR: [
            { titulo: { contains: q, mode: 'insensitive' } },
            { resumen: { contains: q, mode: 'insensitive' } },
            { etiquetas: { has: q } },
          ],
        },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.noticia.findMany({
        where,
        orderBy: { fecha: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.noticia.count({ where }),
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

  async findBySlug(slug: string) {
    const noticia = await this.prisma.noticia.findFirst({
      where: { slug, publicado: true },
    });
    if (!noticia) {
      throw new NotFoundException(`Noticia con slug "${slug}" no encontrada`);
    }
    return noticia;
  }
}