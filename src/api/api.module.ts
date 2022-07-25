import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Company } from './entities/company';
import { Employee } from './entities/employee';
import { SMSToken } from './entities/token';
import { User } from './entities/user';
import { CompanyResolver } from './resolver/company.resolver';
import { EmployeeResolver } from './resolver/employee.resolver';
import { UserResolver } from './resolver/user.resolver';
import { CompanyService } from './service/company.service';
import { EmployeeService } from './service/employee.service';
import { HelperService } from './service/helper.service';
import { NotificationService } from './service/notification.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([SMSToken]),
  ],
  providers: [
    UserResolver,
    UserService,
    EmployeeResolver,
    HelperService,
    EmployeeService,
    NotificationService,
    CompanyService,
    CompanyResolver,
  ],
  exports: [],
})
export class ApiModule {}
