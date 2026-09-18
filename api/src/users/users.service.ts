import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.usuario.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return safeUser;
  }
}