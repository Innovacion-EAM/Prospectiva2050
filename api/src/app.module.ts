import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { NoticiasModule } from './noticias/noticias.module';
import { DocumentosModule } from './documentos/documentos.module';
import { ConvocatoriasModule } from './convocatorias/convocatorias.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    NoticiasModule,
    DocumentosModule,
    ConvocatoriasModule,
    AuthModule,
  ],
})
export class AppModule {}