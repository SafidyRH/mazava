import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async createCompany(data: any) {
    return this.prisma.company.create({ data });
  }

  async getCompanyById(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async updateCompany(id: string, data: any) {
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }

  async deleteCompany(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }
}
