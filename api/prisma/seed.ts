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