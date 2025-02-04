import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmploymentDto } from './dto/create-employment.dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto/update-employment.dto';
import { FilterEmploymentDto } from './dto/filter-employment.dto';

@Injectable()
export class EmploymentService {
  constructor(private readonly prisma: PrismaService) {}

  // Créer un nouvel emploi
  async createEmployment(data: CreateEmploymentDto) {
    return this.prisma.employment.create({
      data,
    });
  }

  // Récupérer tous les emplois d'un utilisateur
  async getEmploymentsByUser(userId: string) {
    return this.prisma.employment.findMany({
      where: { userId },
      include: { company: true },
    });
  }

  // Mettre à jour un emploi
  async updateEmployment(employmentId: string, data: UpdateEmploymentDto) {
    return this.prisma.employment.update({
      where: { id: employmentId },
      data,
    });
  }

  // Supprimer un emploi
  async deleteEmployment(employmentId: string) {
    return this.prisma.employment.delete({
      where: { id: employmentId },
    });
  }

  async findAll(filters: FilterEmploymentDto) {
    const { jobTitle, startDate, companyId } = filters;

    const employments = await this.prisma.employment.findMany({
      where: {
        jobTitle: jobTitle ? { contains: jobTitle } : undefined,
        startDate: startDate ? { gte: new Date(startDate) } : undefined,
        companyId: companyId || undefined,
      },
      include: {
        user: true,
        company: true,
      },
    });
    if (!employments.length) {
      throw new NotFoundException('No employments found');
    }
    return employments;
  }
}
