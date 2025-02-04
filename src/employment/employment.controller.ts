import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { CreateEmploymentDto } from './dto/create-employment.dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto/update-employment.dto';
import { Roles, RolesGuard } from '../auth/role-guard';
import { FilterEmploymentDto } from './dto/filter-employment.dto';

@Controller('employments')
@UseGuards(RolesGuard)
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) {}

  @Post()
  async createEmployment(@Body() createEmploymentDto: CreateEmploymentDto) {
    return this.employmentService.createEmployment(createEmploymentDto);
  }

  @Get(':userId')
  async getEmploymentsByUser(@Param('userId') userId: string) {
    return this.employmentService.getEmploymentsByUser(userId);
  }

  @Patch(':employmentId')
  async updateEmployment(
    @Param('employmentId') employmentId: string,
    @Body() updateEmploymentDto: UpdateEmploymentDto,
  ) {
    return this.employmentService.updateEmployment(
      employmentId,
      updateEmploymentDto,
    );
  }

  @Delete(':employmentId')
  async deleteEmployment(@Param('employmentId') employmentId: string) {
    return this.employmentService.deleteEmployment(employmentId);
  }

  @Get()
  @Roles('admin', 'manager', 'user')
  async findAll(@Query() filters: FilterEmploymentDto) {
    return this.employmentService.findAll(filters);
  }
}
