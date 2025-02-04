import { IsOptional, IsString, IsDateString } from 'class-validator';

export class FilterEmploymentDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}
