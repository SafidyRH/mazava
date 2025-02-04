import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateEmploymentDto {
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;
}
