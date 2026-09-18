import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const seedPath = path.join(__dirname, 'seed-data', 'noticias.json');
  const raw = fs.readFileSync(seedPath, 'utf-8');
  const data = JSON.parse(raw);

  if (Array.isArray(data.noticias)) {
    for (const n of data.noticias) {
      await prisma.noticia.upsert({
        where: { slug: n.slug },
        update: {
          titulo: n.titulo,
          fecha: new Date(n.fecha),
          categoria: n.categoria,
          imagen: n.imagen ?? null,
          resumen: n.resumen,
          contenido: n.contenido,
          etiquetas: n.etiquetas ?? [],
          publicado: n.publicado ?? true,
          destacado: n.destacado ?? false,
        },
        create: {
          slug: n.slug,
          titulo: n.titulo,
          fecha: new Date(n.fecha),
          categoria: n.categoria,
          imagen: n.imagen ?? null,
          resumen: n.resumen,
          contenido: n.contenido,
          etiquetas: n.etiquetas ?? [],
          publicado: n.publicado ?? true,
          destacado: n.destacado ?? false,
        },
      });
    }
    console.log(`Seeded ${data.noticias.length} noticias`);
  }

  const docsPath = path.join(__dirname, 'seed-data', 'documentos.json');
  const docsData = JSON.parse(fs.readFileSync(docsPath, 'utf-8'));

  if (Array.isArray(docsData.documentos)) {
    for (const d of docsData.documentos) {
      const existing = await prisma.documento.findFirst({ where: { titulo: d.titulo } });
      const data = {
        autor: d.autor,
        fecha: new Date(d.fecha),
        tipo: d.tipo,
        delimitacion: d.delimitacion,
        formato: d.formato,
        link: d.link ?? null,
      };
      if (existing) {
        await prisma.documento.update({ where: { id: existing.id }, data });
      } else {
        await prisma.documento.create({ data: { titulo: d.titulo, ...data } });
      }
    }
    console.log(`Seeded ${docsData.documentos.length} documentos`);
  }

  if (Array.isArray(docsData.convocatorias)) {
    for (const c of docsData.convocatorias) {
      const existing = await prisma.convocatoria.findFirst({ where: { titulo: c.titulo } });
      const data = {
        fecha: c.fecha ? new Date(c.fecha) : null,
        descripcion: c.descripcion ?? null,
        enlace: c.enlace ?? null,
        activa: c.activa ?? true,
      };
      if (existing) {
        await prisma.convocatoria.update({ where: { id: existing.id }, data });
      } else {
        await prisma.convocatoria.create({ data: { titulo: c.titulo, ...data } });
      }
    }
    console.log(`Seeded ${docsData.convocatorias.length} convocatorias`);
  }

  const passwordHash = bcrypt.hashSync('horizonte2050', 10);
  await prisma.usuario.upsert({
    where: { email: 'admin@horizontequindio2050.com' },
    update: {
      nombre: 'Administrador HQP2050',
      passwordHash,
      rol: 'ADMIN',
      activo: true,
    },
    create: {
      email: 'admin@horizontequindio2050.com',
      nombre: 'Administrador HQP2050',
      passwordHash,
      rol: 'ADMIN',
      activo: true,
    },
  });
  console.log('Seeded admin user: admin@horizontequindio2050.com');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });