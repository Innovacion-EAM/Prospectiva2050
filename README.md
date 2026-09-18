# Horizonte Quindío Prospectiva 2050 — Plataforma web

Sitio institucional del proyecto **Horizonte Quindío Prospectiva 2050** (`www.horizontequindio2050.com`).
Plataforma de presentación, consulta, divulgación y seguimiento del proceso prospectivo del Quindío.

> El boceto de referencia está en `sitio-web/` (HTML estático). Este repositorio (`website/`) es el
> producto final en arquitectura de servicios.

## Arquitectura

| Servicio | Tecnología | Puerto | Descripción |
| --- | --- | --- | --- |
| `api` | NestJS + Prisma + PostgreSQL | 3000 | API REST (contenido + formularios + autenticación JWT) |
| `web` | TanStack Start (React 19) | 3001 → 8080 | Sitio público (SSR con datos de la API) |
| `admin` | React + Vite + TypeScript | 3002 | Backoffice (login JWT, gestión de contenido) |
| `db` | PostgreSQL 16 | 5432 | Base de datos |

```
website/
├── api/           # NestJS + Prisma + PostgreSQL
├── web/           # TanStack Start + React 19 — sitio público
├── admin/         # React + Vite + TS — backoffice
├── docker-compose.yml
├── .env.example
└── README.md
```

### Base de datos

PostgreSQL. En el **primer despliegue** se usa **Supabase** (PostgreSQL gestionado, mismo formato
`postgres://`). Al migrar a una instancia propia (AWS + Traefik), basta con apuntar `DATABASE_URL`
al container de Postgres. No hay vendor-lock.

Schema: `Noticia`, `Documento`, `Convocatoria`, `Usuario` (roles `ADMIN`/`EDITOR`),
`MensajeContacto`, `Sugerencia`, `InscripcionTaller`, `SuscripcionBoletin`.
Seed (idempotente): 12 noticias reales, documentos, convocatorias y usuario administrador.

El front (`web`) **no guarda contenido**: lo consulta a la API (`PUBLIC_API_URL` desde el servidor)
y los formularios escriben en ella (`VITE_API_URL` desde el navegador). La fuente de verdad única
es la base de datos.

## Puesta en marcha (local)

Requisitos: Docker + Docker Compose.

```bash
cp .env.example .env      # ajusta valores si lo necesitas
docker compose up -d --build
```

| Servicio | URL |
| --- | --- |
| Sitio público | http://localhost:3001 |
| Backoffice | http://localhost:3002 |
| API (health) | http://localhost:3000/api/health |
| PostgreSQL | `localhost:5432` (usuario `hq2050`, base `hq2050`) |

### Credenciales del backoffice (admin)

- Usuario: `admin@horizontequindio2050.com`
- Contraseña: `horizonte2050`

### Desarrollo local (hot reload)

```bash
# API
cd api && npm install && npx prisma generate
npm run start:dev

# Web (SSR; PUBLIC_API_URL=http://localhost:3000 apunta a la API local)
cd web && npm install && npm run dev   # http://localhost:8080

# Admin
cd admin && npm install && npm run dev
```

## API

Prefijo global: `/api` · Formato JSON · CORS configurable.

| Método | Ruta | Descripción | Auth |
| --- | --- | --- | --- |
| GET | `/api/health` | Estado del servicio | — |
| GET | `/api/noticias?categoria=&q=&page=&perPage=` | Listado paginado de noticias | — |
| GET | `/api/noticias/:slug` | Detalle de noticia | — |
| GET | `/api/documentos?tipo=&delimitacion=&q=&page=&perPage=` | Repositorio documental | — |
| GET | `/api/convocatorias` | Convocatorias activas | — |
| POST | `/api/forms/contacto` | Guarda mensaje de contacto | — |
| POST | `/api/forms/sugerencias` | Guarda pregunta/recomendación ciudadana | — |
| POST | `/api/forms/inscripciones` | Guarda inscripción a taller | — |
| POST | `/api/forms/boletin` | Alta de suscripción al boletín (upsert por correo) | — |
| GET | `/api/forms` | Todos los formularios recibidos | Bearer (ADMIN/EDITOR) |
| POST | `/api/auth/login` | Login JWT → `{ accessToken, user }` | — |
| GET | `/api/auth/perfil` | Usuario autenticado | Bearer |

## Despliegue

### 1) Supabase (base de datos)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **Project Settings → Database → Connection string** y copia la cadena `postgresql://...`.
3. Da a la API acceso a esa DB (la API ejecuta `prisma db push` + seed al arrancar).

### 2) Render (API)

`api/render.yaml` ya está preparado. En Render:

1. **New → Blueprint** y conecta el repo, o crea un **Web Service** con:
   - Build: `npm ci && npx prisma generate && npm run build`
   - Start: `npx prisma db push --schema prisma/schema.prisma --accept-data-loss && npx prisma db seed --schema prisma/schema.prisma && node dist/main.js`
2. Variables de entorno: `DATABASE_URL` (Supabase), `JWT_SECRET`, `JWT_EXPIRES_IN=7d`, `CORS_ORIGINS`.

### 3) Vercel (Web y Admin)

Son dos proyectos independientes en el mismo repo GitHub:

- **Proyecto web** → raíz `web/`, framework preset **Vite/TanStack Start** (build `vite build` con
  preset nitro `vercel` incluido en `vite.config.ts`).
  - Env var de build: `VITE_API_URL` (URL pública de la API en Render, para los formularios desde el navegador).
  - Env var runtime: `PUBLIC_API_URL` (misma URL de la API, para las consultas SSR de noticias/documentos/convocatorias).
- **Proyecto admin** → raíz `admin/`, framework preset **Vite**.
  - Env var de build: `VITE_API_URL` (misma URL de la API).

### Flujo futuro (instancia propia)

Cuando migres a una instancia AWS: container de PostgreSQL propio + Traefik (rutas, SSL con
Let's Encrypt), rate limiting y revalidación on-demand. Solo cambian variables de entorno y la
estrategia de despliegue; el código es el mismo.

## Fases

- **Fase 1 (actual):** base del producto — servicios dockerizados, sitio público (TanStack Start)
  conectado a la API, contenidos y formularios persistidos, backoffice con login y listado de contenido.
- **Fase 2:** backoffice completo — CRUD de noticias/documentos/convocatorias, gestión de
  formularios (contacto/propuestas), usuarios y roles, subida de archivos.
- **Fase 3:** instancia propia, Traefik, SSL, rate limiting, analítica.

---

*Horizonte Quindío Prospectiva 2050 — Desarrollo, puesta en marcha y mantenimiento: Institución
Universitaria EAM.*