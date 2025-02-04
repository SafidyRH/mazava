import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EmploymentController],
  providers: [EmploymentService, PrismaService],
})
export class EmploymentModule {}
