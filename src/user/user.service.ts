import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe avec un sel de 10
    return this.prisma.user.create({
      data: { email, password: hashedPassword }, // Stockage du mot de passe hashé
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByToken(token: string) {
    if (!token) {
      return null;
    }
    return this.prisma.user.findFirst({
      where: {
        confirmationToken: {
          equals: token,
        },
      },
    });
  }

  async updateUserByEmail(email: string, data: Partial<User>) {
    return this.prisma.user.update({ where: { email }, data });
  }

  async updateUserById(id: string, data: Partial<User>) {
    return this.prisma.user.update({ where: { id }, data });
  }
}
