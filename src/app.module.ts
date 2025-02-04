import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmploymentModule } from './employment/employment.module';
import { EmploymentController } from './employment/employment.controller';
import { EmploymentService } from './employment/employment.service';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CompanyModule,
    EmploymentModule,
  ],
  controllers: [AppController, EmploymentController],
  providers: [AppService, EmploymentService],
})
export class AppModule {}
