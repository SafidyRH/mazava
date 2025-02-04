import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCompany(@Body() data: any) {
    return this.companyService.createCompany(data);
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateCompany(@Param('id') id: string, @Body() data: any) {
    return this.companyService.updateCompany(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteCompany(@Param('id') id: string) {
    return this.companyService.deleteCompany(id);
  }

  @Get()
  async getAllCompanies() {
    return this.companyService.getAllCompanies();
  }
}
